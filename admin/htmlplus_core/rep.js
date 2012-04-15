	
var tipi = {};
	
var initRepTypes = function(){
	
	tipi["boolean"] = {
		random: function(){
			return _.boolRandom();
		}
	};
	
	tipi["number"] = {
		random: function(number_type, min, max, decimals){
			var is_int = (number_type=="int" || number_type=="int-percent") ? true : undefined;
			min = _.tryParse(min, _.maxInteger(true), is_int);
			max = _.tryParse(max, _.maxInteger(), is_int);
			if(number_type=="percent" || number_type=="int-percent"){
				if(min<-100)
					min = -100;
				if(max>100)
					max = 100;
			}
			if(min>max)
				min=max;
			
			var ret = _.random(max,min,is_int);
			return (is_int) ? ret : _.round(ret, (_.is(decimals) ? decimals : 2));
		},
		asString: function(number, measure, exp, base){
			var ret = ""+number;
			exp = _.tryParse(exp, null, true);
			if(_.isNumber(exp)){
				base = (base=="e") ? base : _.tryParse(base, 10, true);
				ret += " X"+base+"^"+exp;
			}
			if(_.isString(measure))
				ret+= " "+measure;
			return ret;
		},
		randomString: function(number_type, min, max, measure, exp, base){
			if(number_type=="percent" || number_type=="int-percent")
				measure = "%" + (_.isString(measure) ? " "+measure : "");
			var num = this.random(number_type, min, max);
			if(_.isObject(exp) || exp===true){
				var min_e = _.isObject(exp) ? _.tryParse(exp.min, -10, true) : -10;
				var max_e = _.isObject(exp) ? _.tryParse(exp.max, 10, true) : 10;
				exp = _.random(max_e,min_e,true);
			}
			else
				exp = _.tryParse(exp, null, true);
			return this.asString(num, measure, exp, base);
		}
	};
	
	tipi["date"] = {
		randomTimestamp: function(min_or_range, max_or_range, auto){
			if(!!auto)
				return _.isString(auto) ? _.date(auto) : new Date();
			var min; var max;
			var now = new Date();
			
			var min_range = (_.isString(min_or_range) && ( (min_or_range.indexOf("y")>0 || min_or_range.indexOf("m")>0 || 
					min_or_range.indexOf("d")>0 || min_or_range.indexOf("-")>0)) ) ? min_or_range : null;
			var max_range = (_.isString(max_or_range) && ( (max_or_range.indexOf("y")>0 || max_or_range.indexOf("m")>0 || 
					max_or_range.indexOf("d")>0 || max_or_range.indexOf("-")>0)) ) ? max_or_range : null;
			if(_.is(min_range) && _.is(max_range)){
				min = _.nextDate(now,min_range,null,true);
				max = _.nextDate(now,max_range); 
			}
			else if(_.is(min_range) || _.is(max_range)){
				if(_.is(min_range)){
					max = _.is(max_or_range) ? _.date(max_or_range) : now; 
					min = _.nextDate(max,min_range,null,true);
				}
				else{
					min = _.is(min_or_range) ? _.date(min_or_range) : now;  
					max = _.nextDate(min,max_range);
				}
			}
			else{	
				min = _.is(min_or_range) ? _.date(min_or_range) : _.maxDate(true);
				max = _.is(max_or_range) ? _.date(max_or_range) : _.maxDate();
			}
			
			return _.random(max.getTime(),min.getTime(),true);
		},
		random:function(min_or_range, max_or_range, auto){
			var rand = this.randomTimestamp(min_or_range, max_or_range, auto);
			return new Date(rand);
		},
		randomString: function(min_or_range, max_or_range, hours, usa_format, auto){
			var date = this.random(min_or_range, max_or_range, auto);
			return _.dateStr(date, hours, usa_format);
		}
	};
		

	tipi["char"] = {
		random: function(vocal, english_or_accents){
			var chars = (!!vocal) ? ["a","e","i","o","u"] : ["b","c","d","f","g","h","l","m","n","p","q","r","s","t","v","z"];
			if(!!english_or_accents){
				if(!!vocal)
					chars.push("à","è","é","ì","ò","ù");
				else
					chars.push("j","k","w","x","y");
			}
			return _.random(chars);
		}
	};
	
	tipi["string"] = {
		random: function(max_length, min_length){
			var len = _.random(_.tryParse(max_length,10),_.tryParse(min_length,4),true);
			var ret = ""; var vocal = false; var num = 0;
			vocal = _.boolRandom();
			while(ret.length<len){
				num = _.random(vocal ? 2 : 3,1);
				for(var i=0; i<num && ret.length<len; i++){
					ret+=tipi.char.random(vocal/*,(vocal ? ret.length==len-1 : true)*/);
				}
				vocal = !vocal;
			}
			return ret;
		}
		/*
		TODO: facciamolo più evoluto, con la generazione di sillabe invece che chars... :-)
		addSyllable: function(word, max_word_len, only_latin){
			
		}
		*/
		
	};
	
	
	
	
	tipi["link"] = {
		tables:{},
		repo_random: {},
		random: function(linked_type){
			var table = _.isString(this.tables[linked_type]) ? this.tables[linked_type] : linked_type; 
			var key = tipi.string.random(5,8);
			var repo_obj = this.repo_random[linked_type];
			if(_.isString(repo_obj)){
				var repo_table = jsOn.get("repo_random-"+repo_obj);
				var keys = _.keys(repo_table);
				if(!_.isEmpty(keys))
					key = _.random(keys);
				else
					throw "RepoRandom table "+repo_obj+" is empty: unable to link it!";
			}
			return this.getLink(table,key,true);
		},
		getLink: function(table,key,already_db_table){
			return "/"+((!!already_db_table) ? table : this.tables[table])+"/"+key;
		},
		repoRandomTable: function(table){
			if(_.isString(table) && (!_.isEmpty(this.tables)) && (!_.isEmpty(this.repo_random))){
				var table_key = this.getLinkInfoKey(table);
				if(_.isString(table_key))
					return this.repo_random[table_key];
			}
		},
		getLinkInfoKey: function(searching_key, from_repo_name){
			var link_key = null;
			var from = (!!from_repo_name) ? this.repo_random : this.tables;
			_.each(from, function(val, key){
				if(val==searching_key)
					link_key=key;
			});
			return link_key;
		},
		resolve: function(link){
			var arr = _.isString(link) ? link.split('/') : new Array();
			// we are considering that links could be relative (without the initial slash)...
			if(arr.length>1){
				var table = (arr.length>2 && arr[0].length>0) ? arr[0] : arr[1]; 
				var key = (arr.length>2 && arr[0].length>0) ? arr[1] : arr[2];
				var repo_table = this.repoRandomTable(table);
				if(_.isString(repo_table))
					return jsOn.get("repo_random-"+repo_table,key);
			}
		}
	};

	
	
	// TODO: aggiungiamo gestione without_duplicates per evitare duplicati... 
	tipi["array"] = {
		random: function(min_length, max_length, type_or_vals_or_fn, without_duplicates){
			var ret = new Array();
			var min = _.tryParse(min_length,0,true);
			var max = (_.isArray(type_or_vals_or_fn) && (!_.is(max_length))) ? type_or_vals_or_fn.length : _.tryParse(max_length,20,true);
			var num = tipi.number.random("int",min,max);
			var elem=null;
			for(var i=0;i<num;i++){
				elem = _.isString(type_or_vals_or_fn) ? tipi[type_or_vals_or_fn].random() : 
						(_.isArray(type_or_vals_or_fn) ? _.random(type_or_vals_or_fn) : 
						(_.isFunction(type_or_vals_or_fn) ? type_or_vals_or_fn.call() : 
						(_.is(type_or_vals_or_fn) ? type_or_vals_or_fn : {} )));
				ret.push(elem);
			}
			return ret;
		}
	};
	
	
	
	
	
	
	
	tipi["name"] = {
		random: function(gender){
			var names = (!gender) ? ["Gianni","Umberto","Marco","Mario","Filippo","Fabrizio","Satriano","Emanuele","Corrado","Francesco","Giorgio",
			             "Massimo","Guascogno","Daniele","Pio","Michele","Gennaro","Stanislao","Sandrone","Gigi","Ugo","Saverio","Renato",
			             "Roberto"] : ["Gianna","Flavia","Rituccia","Maria","Filipponia","Satriana","Emanuela","Jessica","Francesca","Giorgia",
  			             "Sabrina","Laura","Daniela","Ilaria","Chiara","Sveva","Marcella","Sandra","Luigia","Lorena","Valentina","Renata",
			             "Robertina"];
			return _.random(names);
		}
	};
	
	tipi["surname"] = {
		random: function(){
			var names = ["Tognazzi","Gasperoni","Allori","Scarcello","Costabile","Cardamone","Garibaldi","Kant","Guzzanti","Guccini","Pisciotti",
			             "Gaber","Paturzo","Rizzo","Laurenti","Lopez","Turano","Spadafora","Degli Umberti","Della Gasparrosa","Kostner","Cerra",
			             "Romano","Gigliotti","Falvo","Minetti","Bersano","Gervasoni","Hubner","Miriola","Pischellacchero"];
			return _.random(names);
		}
	};
	
	
	
	
	
	
	
	tipi["enum"] = {
		values: [],
		random: function(){
			return _.random(this.values);
		}
	};
	
	declareEnumType = function(type_name, enum_name_or_values_or_object){
		var nuovo_enum = _.deepClone(tipi["enum"]);
		if(_.isString(enum_name_or_values_or_object) || _.isArray(enum_name_or_values_or_object)){
			var vals = _.isArray(enum_name_or_values_or_object) ? enum_name_or_values_or_object :
					_.nav(jsOn.get("enums")).get(enum_name_or_values_or_object);
			tipi[type_name] = _.extendObj(nuovo_enum,{ values: vals });
		}
		else
			tipi[type_name] = _.extendObj(nuovo_enum,enum_name_or_values_or_object);
	};
	
	declareEnumTypes = function(enum_types_declarations){
		_.each(enum_types_declarations, function(dec){
			if(_.isString(dec))
				declareEnumType(dec, dec);
			else
				declareEnumType(dec.type, _.is(dec.enum) ? dec.enum : dec.type);
		});
	};
	
	declareEnumTypes([{ type:"collection_type", enum: "collection_types" },{ type:"collection_state", enum: "collection_states" },
	                  { type:"processing_state", enum: "processing_states" },{ type:"collection_facility", enum: "collection_facilities" },
	                  { type:"processing_facility", enum: "processing_facilities" }, "vascular_access", "valutation", 
	                  "group_compatibility", "cryoprotector", "anticoagulant", "additive"]);
	
	declareEnumType("manipulation_type", {
		values: _.nav(jsOn.root(),"/").get("enums/manipulations"),
		random: function(collection_type, is_freezed){
			var vals = this.getValues(collection_type); 
			if(!!is_freezed)
				vals = _.without(vals,"unfreezing");
			else
				vals = _.without(vals,"freezing");
			return _.random(vals);
		},
		getValues: function(collection_type){
			var nav = _.nav(jsOn.get("enums"));
			return (collection_type=="HPC_M" || collection_type=="HPC_A" || collection_type=="TC_T") ? 
					nav.get("manipulations_"+collection_type) : this.values;
		}
	});
	
	
	
	
	
	
	declareEnumType("city",["Castrolibero","Cosenza","Rende","Montalto","Marano","Legnano","Rho","Fiumicino","Frascati","Cerveteri",
	                          "Empoli","Pozzuoli","Pomigliano D'Arco","Sorrento","Pompei","Procida","Mestre","Murano","Borgomasino","Carmagnola"]);
	
	declareEnumType("province",["Cosenza","Reggio Calabria","Roma","Firenze","Napoli","Milano","Torino","Genova","Rimini","Riccione",
	                             "Chieti","Pescara","Venezia","Verona","Pisa"]);
	declareEnumType("country",["Italia","Francia","Germania","Spagna","Austria","Inghilterra","Irlanda","USA"]);
	
	
	tipi["address"] = {
		random: function(){
			var ret = {};
			ret.city = tipi.city.random();
			ret.province = tipi.province.random();
			ret.postal_code = tipi.number.random("int",10000,99999);
			var piazza = _.boolRandom();
			ret.address = ((!!piazza) ? "piazza " : "via ")+tipi.string.random(10,5)+", "+tipi.number.random("int",1,200);
			ret.country = tipi.country.random();
			
			return ret;
		}	
	};
	
	
	
	
	
	tipi["phone"] = {
		random: function(mobile){
			return (!!mobile) ? ("+39"+_.random(["320","329","340","347","349","330","338","393"])+tipi.number.random("int",1000000,9999999)) : 
					(_.random(["0984","0981","06","052","0982","081"])+tipi.number.random("int",100000,999999));
		}	
	};
	
	tipi["email"] = {
		random: function(){
			return tipi.string.random(10,4)+"@"+_.random(["gmail.com","google.com","hictech.com","libero.it","apple.com","msn.com"]);
		}	
	};
	
	
	tipi["contact"] = {
		random: function(){
			var ret = {};
			ret.telefono = tipi.phone.random();
			ret.cellulare = tipi.phone.random(true);
			ret.email = tipi.email.random();
			return ret;
		}	
	};
	
	
	
	
	
	tipi["notes"] = {
		random: function(max_times){
			var lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et " +
					"dolore magna aliqua. " +
					"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
					"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
					"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ";
			var times = tipi.number.random("int",0,(_.isNumber(max_times) ? max_times : 10));
			var ret = "";
			for(var i=0;i<times;i++)
				ret+="Lorem Ipsum "+i+": <br/> "+lorem_ipsum+" <br/> ";
			return ret;
		}	
	};
	
	
	
	tipi["person"] = {
		random: function(){
			var ret = {};
			
			ret.name = tipi.name.random();
			ret.surname = tipi.surname.random();
			ret.gender = _.boolRandom();
			ret.birth_date = tipi.date.randomTimestamp("1930","1980");
			ret.contacts = tipi.contact.random();
			ret.notes = tipi.notes.random();
			
			return ret;
		}
	};
	
	
	
	
	tipi["center"] = {
		random: function(){
			var ret = {};
			var pub = _.boolRandom();
			var lab_suffixes = ["Lab","Cryo","Stams","Transplants","Research","S.P.A."];
			ret.name = (!!pub) ? ("Ospedale civile di "+tipi.province.random()) : (tipi.surname.random()+" "+_.random(lab_suffixes));
			
			ret.code = tipi.string.random(3,3).toUpperCase();
			ret.address = tipi.address.random();
			ret.contacts = tipi.contact.random();
			
			var divisions = ["Chirurgia","Pediatria","Ortopedia","Psichiatria","Immunologia","Medicina Interna","Otirino-laringoiatria","Oculistica",
			               "Cardiologia","Fisiatria","Pneumologia","Radiologia"];
			ret.divisions = tipi.array.random(1,4,divisions);
			
			return ret;
		}
	};
	
	
	tipi["user"] = {
		random: function(){
			var ret = tipi.person.random();
			
			ret.user = tipi.string.random(6,10);
			ret.password = tipi.string.random(5,9);
			ret.email = tipi.email.random();
			
			var aree = ["clinic","collection","manipulation","admin","system"];
			var ruoli = ["view","edit","manager","admin"];
			var randomArea = function(area){
				var ret = {};
				ret.name = _.isNotEmptyString(area) ? area : 
						(_.isNumber(area) ? aree[_.limit(area,0,aree.length-1)] : _.random(aree));
				ret.role = _.random(ruoli);
				return ret;
			};
			ret.aree = tipi.array.random(1,aree.length,randomArea);
			
			ret.center = _.link.random("center");
			
			return ret;
		}
	};
	

	
	
	
	
	
	
	
	
	tipi["transplant_person"] = {
		random: function(){
			var ret = tipi.person.random();
			
			ret.type = tipi.number.random("int",0,1);
			ret.code = tipi.string.random(8,8).toUpperCase();
			ret.birth_place = tipi.address.random();
			ret.residence = tipi.address.random();
			ret.fiscal_code = tipi.string.random(6,6).toUpperCase()+tipi.number.random("int",30,99)+tipi.char.random().toUpperCase()+
					tipi.number.random("int",0,2)+tipi.number.random("int",0,9)+tipi.char.random().toUpperCase()+
					tipi.number.random("int",0,4)+tipi.number.random("int",10,99)+tipi.char.random().toUpperCase();
			ret.registration_date = tipi.date.randomTimestamp("2000","2010");
			ret.last_edit_date = tipi.date.randomTimestamp("2y","now");
			
			return ret;
		}
	};
	
	
	
	
	tipi["therapeutic_cycle"] = {
		random: function(min_date){
			var ret = {};
			
			var cicli = ["cycle iniziale","Rinforzamento difese immunityrie","Potenziamento risposta linfociti","Aggressione malattia",
			             "Stabilizzazione cellulare","Proliferazione cellulare","Immunizzazione","cycle radicale","cycle finale"];
			var disease_states = ["Iniziale","Poco diffusa","Molto diffusa","Avanzata","Grave","Terminale","Recessione","Recessione avanzata",
			                      "Guarigione","Cronica"];
			
			ret.cycle = _.random(cicli);
			ret.disease_state = _.random(disease_states);
			ret.patient_weight = tipi.number.random(null,45,130,1);
			ret.collections = [];/*tipi.array.random(0,10,function(){
				return tipi.link.random("collection");
			});*/
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}	
	};
	
	
	
	tipi["diagnosi"] = {
		random: function(){
			var ret = {};
			
			var diagnosi = ["Schizofrenia","Immunodeficienza","Sindrome di Gresamt","Morbo di Yanooz","Grave stress","Blastoma","Neuropatia",
			                "Morbo della mucca pazza","Influenza aviaria","Influenza Suina","Sindrome del bamboccione","Disfunzione ormonale"];
			ret.diagnosi = _.random(diagnosi);
			ret.therapeutic_cycles = [];/*tipi.array.random(0,10,"therapeutic_cycle");*/
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}	
	};
	
	
	
	
	
	
	
	
	tipi["patient"] = {
		random: function(){
			var ret = tipi.transplant_person.random();
			
			ret.type = 0;
			ret.diagnosi = tipi.array.random(1,2,"diagnosi");   
			
			var link_center = tipi.link.random("center");
			var center = tipi.link.resolve(link_center);
			ret.provenance = {
				center: link_center,
				division: _.random(center.divisions)
			};

			return ret;
		}	
	};
	
	
	
	tipi["donor"] = {
		random: function(){
			var ret = tipi.transplant_person.random();
			
			ret.type = 1;
			ret.collections = [];/*tipi.array.random(0,50,function(){
				return tipi.link.random("collection");
			});*/
			ret.provenance_center = "Banca del Sangue di "+tipi.province.random(); 
				
			return ret;
		}			
	};
	
	
	
	
	
	
	
	
	
	
	
	tipi["collection_request"] = {
		random: function(){
			var ret = {};
			
			ret.expected_date = tipi.date.randomTimestamp("now","6m");
			ret.group_compatibility = tipi.group_compatibility.random();
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}
	};
	

	tipi["collection_request_HPC_M"] = {
		random: function(){
			var ret = tipi.collection_request.random();
			
			ret.target_dose = tipi.number.randomString(null,0,9.9,"/kg",8);
			
			var manipolazioni_possibili = tipi.manipulation_type.getValues("HPC_M");  
			ret.requested_manipulations = tipi.array.random(1,null,manipolazioni_possibili);
			
			return ret;
		}	
	};
	
	tipi["collection_request_HPC_A"] = {
		random: function(){
			var ret = tipi.collection_request.random();
			
			var fattori_crescita = ["lenta,rapida,velocissima,esponenziale"];
			var manipolazioni_possibili = tipi.manipulation_type.getValues("HPC_A");  
			
			ret.growth_factor = _.random(fattori_crescita);
			ret.dose = tipi.number.randomString(null,0,100,"mcg/kg");
			ret.growth_factor_start_date = tipi.date.randomTimestamp("now","3m");
			ret.vascular_access = tipi.vascular_access.random();
			ret.target_dose = tipi.number.randomString(null,0,9.9,"/kg",6);
			ret.requested_manipulations = tipi.array.random(1,null,manipolazioni_possibili);
			
			return ret;
		}	
	};
	
	tipi["collection_request_TC_T"] = {
		random: function(){
			var ret = tipi.collection_request.random();
			
			var manipolazioni_possibili = tipi.manipulation_type.getValues("TC_T");  
			
			ret.vascular_access = tipi.vascular_access.random();
			ret.target_dose = tipi.number.randomString(null,0,9.9,"/kg",{ min:5, max:7 });
			ret.requested_manipulations = tipi.array.random(1,null,manipolazioni_possibili);
			
			return ret;
		}	
	};

	tipi["collection_request_external"] = {
		random: function(collection_type){
			var ret = tipi.collection_request.random();
			
			if(!_.isNotEmptyString(collection_type))
				collection_type = tipi.collection_type.random();
			var manipolazioni_possibili = tipi.manipulation_type.getValues(collection_type);  
			
			ret.code_donor = tipi.string.random(8,8).toUpperCase();
			ret.provenance_center = "Banca del Sangue di "+tipi.province.random(); 
			ret.gender_donor = _.boolRandom();
			ret.clearance_donor = tipi.valutation.random();
			ret.donor_cmv = tipi.valutation.random();
			ret.requested_manipulations = tipi.array.random(1,null,manipolazioni_possibili);
			ret.notes_transport = tipi.notes.random(3);
			
			return ret;
		}	
	};

	
	
	
	
	tipi["blood_group"] = {
		random: function(){
			var ret = {};
			
			ret.AB0 = _.random(['A','B','0']);
			ret.RH = _.random(['+','-']);
			ret.fenotype_RH = _.random(['CcDee','CCDee','CcDEe','ccdee']);
			ret.KELL = _.boolRandom();
			
			return ret;
		}	
	};
	
	tipi["infections_tests"] = {
		random: function(){
			var ret = {};
			
			ret.antibodies_anti_RBC = _.boolRandom();
			ret.HCV_ab = _.boolRandom();
			ret.HIV_ab = _.boolRandom();
			ret.HBV_ag = _.boolRandom();
			ret.TPHA = _.boolRandom();
			ret.bioHazard = (ret.antibodies_anti_RBC || ret.HCV_ab || ret.HIV_ab || ret.HBV_ag || ret.TPHA);
				
			return ret;
		}		
	};
	
	tipi["suitability_collection"] = {
		random: function(min_date, max_date, stato_collection){
			var ret = {};
			
			ret.blood_group = {
				donor: tipi.blood_group.random(),
				receiving: tipi.blood_group.random()
			};
			ret.infections_tests = tipi.infections_tests.random();
			
			return ret;
		}	
	};
	
	
	tipi["suitability_collection_with_vascular_access"] = {
		random: function(min_date, max_date, stato_collection){
			var ret = tipi.suitability_collection.random();
			ret.suitability_vascular_access = _.boolRandom();
			return ret;
		}	
	};
	
	tipi["timing_test"] = {
		random: function(min_date, esito){
			var ret = {};
			
			var glob = tipi.number.random("number",0,1000);
			var cd34_perc = tipi.number.random("percent",0);
			var cd34 = glob*cd34_perc/100;
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date : "now","5d");
			ret.white_blood_cells = glob+" ul";
			ret.CD34 = cd34_perc+" %";
			ret.CD34_ul = cd34+" ul";
			ret.HB = tipi.number.randomString("number",0,100,"g/dl");
			ret.HCT = tipi.number.randomString("percent",0);
			ret.PLT = tipi.number.randomString("number",0,1000,"ul");
			ret.MNC = tipi.number.randomString("percent",0);
			ret.NEUT = tipi.number.randomString("percent",0);
			ret.LINFO = tipi.number.randomString("percent",0);
			ret.MONO = tipi.number.randomString("percent",0);
			ret.EOS = tipi.number.randomString("percent",0);
			ret.BASO = tipi.number.randomString("percent",0);
			// i molteplici to_revalue servono ad aumentare la sua probabilità rispetto a positivo e negativo
			ret.result = _.is(esito) ? esito : _.random(['positivo','to_revalue','to_revalue','to_revalue','negativo']);
			ret.notes = tipi.notes.random(2);
			
			return ret;
		}
	};
	
	tipi["suitability_collection_apheresis"] = {
		random: function(min_date, max_date, stato_collection){
			var ret = tipi.suitability_collection_with_vascular_access.random();
			
			ret.timing_test = new Array();
			var num = _.random(9,0,true);
			for(var i=0;i<num;i++){
				test = tipi.timing_test.random(min_date,"to_revalue");
				min_date = test.date;
				ret.timing_test.push(test);
			}
			var stato_finale = (stato_collection=="suitable" || stato_collection=="performed") ? "positivo" : ( (stato_collection=="not_suitable") ? "negativo" : null);
			if(!!stato_finale)
				ret.timing_test.push(tipi.timing_test.random(min_date,stato_finale));
			
			return ret;
		}
	};
	
	
	
	tipi["collection_performing"] = {
		random: function(ultima_modifica_collection){
			var ret = {};
			
			if(!_.isNumber(ultima_modifica_collection))
				ultima_modifica_collection = _.is(ultima_modifica_collection,Date) ? ultima_modifica_collection.getTime() : new Date().getTime();
			ret.start_collection = ultima_modifica_collection - tipi.number.random("int",(1000*60*30),(1000*60*60*6));
			ret.end_collection = ultima_modifica_collection;
			ret.volume_unity = tipi.number.randomString(null,20,300,"ml");
			ret.processed_blood_volume = tipi.number.randomString(null,20,ret.volume_unity,"ml");
			ret.flow = tipi.number.randomString(null,0.5,50,"ml/min");
			ret.ACD = tipi.number.randomString(null,0,100,"ml");
			ret.additive = _.random(["Pirina","additivesna","Timina","Adenina","Guanina","Citosina"]);
			ret.separator = _.random(["Scindina","Separina","Dividina","Separazionina"]);
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}	
	};
	
	
	tipi["transport_info"] = {
		random: function(min_date){
			var ret = {};
			
			ret.unity = {
				expiration: tipi.date.randomTimestamp("2013","3y"),
				physical_state: _.random(['solid','liquid','liquid_after_unfreezing'])
			};
			ret.date_delivery = tipi.date.randomTimestamp(min_date,"14d");
			ret.notes = tipi.notes.random(4);
			
			return ret;
		}	
	};
	
	
	
	tipi["collection"] = {
			
		random: function(key, force_terminated){
			var ret = {};
			
			var external = _.boolRandom(5,false);
			var autologa = _.boolRandom();
			var type = tipi.collection_type.random();
			var state = (!!force_terminated) ? _.last(tipi.collection_state.values) : tipi.collection_state.random();
			var type_request = ((!!external) || type=="CB") ? "collection_request_external" : "collection_request_"+type;
			var type_suitability = (type=="HPC_A") ? "suitability_collection_apheresis" : 
					((type=="TC_T") ? "suitability_collection_with_vascular_access" : "suitability_collection");
			
			ret.code = tipi.string.random(8,8).toUpperCase();
			ret.type = type;
			ret.state = state;
			ret.patient = (!external) ? tipi.link.random("patient") : null;
			ret.donor = ((!external) && autologa) ? tipi.link.random("donor") : null;
			ret.insert_date = tipi.date.randomTimestamp("2y");
			ret.last_edit_date = tipi.date.randomTimestamp(ret.insert_date,"1y");
			ret.collection_facility = tipi.collection_facility.random();
			ret.processing_facility = tipi.processing_facility.random();
			ret.request = tipi[type_request].random(type);
			ret.suitability = (state!="requested") ? tipi[type_suitability].random(ret.insert_date,ret.last_edit_date,state) : null;
			ret.performing = (state=="performed") ? tipi.collection_performing.random(ret.last_edit_date) : null;
			ret.transport = ((!!ret.performing) && (force_terminated!==false) && ((!!force_terminated) || _.boolRandom())) ? 
					tipi.transport_info.random(ret.performing.end_collection) : null;
			
			if(_.isNotEmptyString(key))
				this.makeLinks(ret,key);
			
			return ret;
		},
		
		makeLinks: function(collection, key){
			var paz = tipi.link.resolve(collection.patient);
			if(_.is(paz)){ // altrimenti e' una unity' external, e non non ha riferimenti anagrafici...
				var link = tipi.link.getLink("collection",key);
				
				var diagnosi = _.random(paz.diagnosi);
				var cicli = diagnosi.therapeutic_cycles;
				var num_cycle = _.random(cicli.length+2,0,true);
				var cycle = (num_cycle>=cicli.length) ? tipi.therapeutic_cycle.random() : cicli[num_cycle];
				cycle.collections.push(link);
				if(num_cycle>=cicli.length)
					cicli.push(cycle);
				
				var don = tipi.link.resolve(collection.donor);
				if(_.is(don))
					don.collections.push(link);
			}
		}
	};
	
	
	
	
	
	
	
	
	
	
	
	tipi["unity_characterization"] = {
		random: function(){
			var ret = {};
			
			ret.white_blood_cells = tipi.number.randomString("number",0,1000,"ul");
			ret.HB = tipi.number.randomString("number",0,100,"g/dl");
			ret.HCT = tipi.number.randomString("percent",0);
			ret.PLT = tipi.number.randomString("number",0,1000,"ul");
			ret.MNC = tipi.number.randomString("percent",0);
			ret.CD3 = tipi.number.randomString("percent",0);
			ret.CD4 = tipi.number.randomString("percent",0);
			ret.CD8 = tipi.number.randomString("percent",0);
			ret.CD19 = tipi.number.randomString("percent",0);
			ret.NK = tipi.number.randomString("percent",0);
			ret.CD34 = tipi.number.randomString("percent",0);
			ret.volume = tipi.number.randomString("number",20,300,"ml");
			ret.result = tipi.number.randomString("number",0,5000,"cellule/Kg");
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}		
	};
	
	
	
	tipi["acceptance_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date : "2y","now");
			ret.checks = {
				documentation: _.boolRandom(),
				conservation: _.boolRandom()
			};
			
			return ret;
		}	
	};
	
	
	tipi["creation_unity"] = {
		random: function(min_date, unity_madre){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
		
			ret.unity = _.is(unity_madre) ? tipi.link.getLink("unity",unity_madre.H.key) : tipi.array.random(1,5,function(){
				return tipi.link.random("unity");
			});
			return ret;
		}	
	};
	
	
	tipi["single_manipulation_unity"] = {
		random: function(min_date, collection_type){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			var manipolazioni_possibili = tipi.manipulation_type.getValues(collection_type);  
			ret.manipulations = tipi.array.random(1,null,manipolazioni_possibili);
			ret.notes = tipi.notes.random(2);
			
			return ret;
		}	
	};
	
	tipi["manipulation_unity"] = {
		random: function(min_date, collection_type){
			var ret = {};
			
			ret.manipulations = new Array();
			var num = tipi.number.random("int",1,3);
			var man;
			for(var i=0;i<num;i++){
				man = tipi.single_manipulation_unity.random((_.is(man) ? man.date : min_date), collection_type);
				ret.manipulations.push(man);
			}
			
			return ret;
		}	
	};
	
	
	tipi["freezing_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			ret.NC = tipi.number.randomString(null,0,9.9,null,9);
			ret.CD34 = tipi.number.randomString(null,0,9.9,null,6);
			ret.total_volume = tipi.number.randomString("number",20,500,"ml");
			ret.cryoprotector = tipi.cryoprotector.random();
			ret.cryoprotection = tipi.number.randomString("percent",0,20);
			ret.anticoagulants = tipi.array.random(1,5,function(){
				return {
					type : tipi.anticoagulant.random(),
					volume : tipi.number.randomString("number",1,50,"ml")
				};
			});
			ret.additives = tipi.array.random(1,5,function(){
				return {
					type : tipi.additive.random(),
					volume : tipi.number.randomString("number",1,50,"ml")
				};
			});
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}	
	};
	
	
	tipi["storage_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			ret.container = tipi.string.random(6,6);
			ret.tank = tipi.number.random("int",1,100);
			
			return ret;
		}		
	};
	
	tipi["unfreezing_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			
			return ret;
		}		
	};
	
	tipi["request_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			ret.date_start_condizionamento = tipi.date.randomTimestamp(ret.date,"14d");
			ret.date_reinfusione = tipi.date.randomTimestamp(ret.date_start_condizionamento,"21d");
			
			return ret;
		}		
	};
	
	tipi["suitability_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			ret.vitality_CD34 = tipi.number.randomString("percent",0);
			ret.vitality_NC = tipi.number.randomString("percent",0);
			ret.sterility = _.boolRandom();
			ret.bag_integrity = _.boolRandom();
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}		
	};
	
	
	tipi["release_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			ret.destination = tipi.link.random("center");
			ret.reference = tipi.link.random("person");
			ret.send_delegate = _.boolRandom();
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}		
	};
	
	
	tipi["reinfusion_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			ret.duration = tipi.number.randomString("int",20,180,"minuti");
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}		
	};
	
	
	tipi["engraftment_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			ret.date_PMN = tipi.date.randomTimestamp(ret.date,"14d");
			ret.date_PLTS = tipi.date.randomTimestamp(ret.date,"14d");
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}		
	};
	
	
	tipi["fractionation_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.date = tipi.date.randomTimestamp(_.is(min_date) ? min_date: "2y","now");
			
			var fraz = 0;
			var perc = 100;
			ret.fractions = tipi.array.random(2,10,function(){
				fraz++;
				var fraz_perc = tipi.number.random("percent",1,perc);
				perc-=fraz_perc;
				return {
					fraction : fraz,
					percentage : fraz_perc
				};
			});
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}		
	};
	
	
	tipi["assembly_unity"] = {
		random: function(min_date){
			var ret = {};
			
			ret.notes = tipi.notes.random(3);
			
			return ret;
		}		
	};
	
	
	tipi["unity"] = {
		random: function(collection, unity_madre, forza_terminazione){
			var ret = {};
			
			var min_date = _.isObject(collection) ? collection.transport.date_delivery : tipi.date.randomTimestamp("2y");
			var collection_type = _.isObject(collection) ? collection.type : tipi.collection_type.random();
			var starting_state = this.findState(unity_madre);
			var future_states = this.futureStates(starting_state);
			var own_destiny = (forza_terminazione=="assembly" || forza_terminazione=="fractionation") ? false : 
					_.boolRandom(_.is(unity_madre) ? 2 : 1);
			var termination = ((!!forza_terminazione) && (!!own_destiny)) ? forza_terminazione : 
				_.random((!!own_destiny) ? (future_states.length>1 ? _.rest(future_states) : future_states) : ["accepted","manipulated","unfreezed"]);
			
			
			ret.collection = _.isObject(collection) ? collection.H.key : null;
			ret.processing_facility = (_.isObject(collection) && _.boolRandom()) ? collection.processing_facility : tipi.processing_facility.random();
			ret.code = _.isObject(collection) ? collection.code : tipi.string.random(8,8).toUpperCase();
			ret.insert_date = min_date;
			
			if(_.is(unity_madre))
				ret.creation = tipi.creation_unity.random(min_date, unity_madre);
			else{
				ret.acceptance = tipi.acceptance_unity.random(min_date);
				ret.initial_characterization = tipi.unity_characterization.random();
			}
			min_date = (!!ret.creation) ? ret.creation.date : ret.acceptance.date;
			if(termination=="accepted")
				return this.terminateUnity(ret, min_date, forza_terminazione);
			
			if(_.include(future_states,"manipulated")){
				ret.manipulation = tipi.manipulation_unity.random(min_date, collection_type);
				ret.characterization_after_manipulation = tipi.unity_characterization.random();
				min_date = ret.manipulation.date;
				if(termination=="manipulated")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"freezed")){
				ret.freezing = tipi.freezing_unity.random(min_date);
				min_date = ret.freezing.date;
				if(termination=="freezed")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"stored")){
				ret.storage = tipi.storage_unity.random(min_date);
				min_date = ret.storage.date;
				if(termination=="stored")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"unfreezed")){
				ret.unfreezing = tipi.unfreezing_unity.random(min_date);
				ret.characterization_after_unfreezing = tipi.unity_characterization.random();
				min_date = ret.unfreezing.date;
				if(termination=="unfreezed")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"request")){
				ret.request = tipi.request_unity.random(min_date);
				min_date = ret.request.date;
				if(termination=="request")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"suitable")){
				ret.suitability = tipi.suitability_unity.random(min_date);
				min_date = ret.suitability.date;
				if(termination=="suitable")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"released")){
				ret.release = tipi.release_unity.random(min_date);
				min_date = ret.release.date;
				if(termination=="released")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"reinfused")){
				ret.reinfusion = tipi.reinfusion_unity.random(min_date);
				min_date = ret.reinfusion.date;
				if(termination=="reinfused")
					return this.terminateUnity(ret, min_date, forza_terminazione);
			}
			
			if(_.include(future_states,"engrafted")){
				ret.engraftment = tipi.engraftment_unity.random(min_date);
				min_date = ret.engraftment.date;
			}
			
			return this.terminateUnity(ret, min_date, forza_terminazione);
		},
		terminateUnity: function(unity, min_date, terminazione){
			var state = this.findState(unity);
			if((!_.isNotEmptyString(terminazione)) && (state=="accepted" || state=="manipulated" || state=="unfreezed")){
				var in_corso = _.boolRandom();
				if(!in_corso)
					terminazione = _.boolRandom() ? "fractionation" : "assembly";
			}
			if(terminazione=="fractionation"){
				unity.fractionation = tipi.fractionation_unity.random(min_date);
				min_date = unity.fractionation.date;
			}
			else if(terminazione=="assembly"){
				unity.assembly = tipi.assembly_unity.random(min_date);
				min_date = unity.assembly.date;
			}
			
			unity.last_edit_date = min_date;
			return unity;
		},
		findState: function(unity){
			if(_.isObject(unity)){
				if(!!unity.engraftment)
					return "engrafted";
				else if(!!unity.reinfusion)
					return "reinfused";
				else if(!!unity.release)
					return "released";
				else if(!!unity.suitability)
					return "suitable";
				else if(!!unity.request)
					return "request";
				else if(!!unity.unfreezing)
					return "unfreezed";
				else if(!!unity.storage)
					return "stored";
				else if(!!unity.freezing)
					return "freezed";
				else if(!!unity.manipulation)
					return "manipulated";
				else if((!!unity.acceptance) || (!!unity.creation))
					return "accepted";
			}
		},
		futureStates: function(current_state){
			var states = tipi.processing_state.values;
			if(!_.isNotEmptyString(current_state))
				return states;
			else{
				var ret = new Array();
				var found = false;
				_.each(states, function(state){
					if(found)
						ret.push(state);
					else if(state==current_state)
						found = true;
				});
				return ret;
			}
		}
	};
	
};



	var random_creator={
		centri: function(key){
			return tipi["center"].random();
		},
		cristiani: function(key){
			return tipi["person"].random();
		},
		donatori: function(key){
			return tipi["donor"].random();
		},
		pazienti: function(key){
			return tipi["patient"].random();
		},
		raccolte: function(key){
			return tipi["collection"].random(key,false);
		},
		unita: function(key){
			var collection = createRandom("raccolte", function(_key){
				return tipi["collection"].random(_key,true);
			},key);
			var unity = tipi["unity"].random(collection);
			gestisciFineUnita(unity,collection);
			return unity;
		}
	};
	
	function gestisciFineUnita(unity, collection, key){
		if((!_.isString(key)) && _.isObject(collection) && _.isObject(collection.H))
			key = collection.H.key;
		if((!unity.H) || (!unity.H.key)) // pre-setting della key per le unity' figlie... 
			unity.H={
				key : key
			};
		if(_.is(unity.fractionation)){
			_.each(unity.fractionation.fractions, function(fraction){
				var fraction_key = key+"_"+fraction.fraction;
				var unity_fraction = createRandom("unita",function(_key){
					return tipi["unity"].random(collection,unity);
				},fraction_key);
				unity_fraction.code = unity.code+"_"+fraction.fraction;
				unity_fraction.H.searchables.code = unity_fraction.code;
				gestisciFineUnita(unity_fraction, collection, fraction_key);
			});
		}
		else if(_.is(unity.assemblaggio)){
			console.log("Unità assemblata....");
		}
	}
	
	function createRandom(type, creation_fn, key){
		try{
		key = _.isString(key) ? key : tipi["string"].random(16,16);
		var obj = _.isFunction(creation_fn) ? creation_fn.call(null, key) : random_creator[type].call(null, key);
		if(_.is(obj) && _.isNotEmptyString(key)){
			if(!_.is(obj.H))
				obj.H = {};
			obj.H.key = key;
			obj.H.type = tipi.link.tables[tipi.link.getLinkInfoKey(type,true)];
			
			var s = {};
			if(type=="donatori" || type=="pazienti"){
				s.code = obj.code;
				s.type = obj.type;
				s.name = obj.name;
				s.surname = obj.surname;
				s.birth_date = obj.birth_date;
				s.birth_place = synthAddress(obj.birth_place);
				s.registration = obj.registration_date;
				s.last_edit = obj.last_edit_date;
				if(type=="pazienti"){
					if(_.isObject(obj.provenance)){
						/*var center = tipi.link.resolve(obj.provenance.center); 
						s.provenance = center.name;*/
						s.provenance = getOnlyKey(obj.provenance.center);
						s.wird = obj.provenance.division;
					}
				}
				else
					s.provenance = obj.provenance_center; 
			}
			else if(type=="raccolte"){
				s.code = obj.code;
				s.type = obj.type;
				s.collection_facility = obj.collection_facility;
				s.state = obj.state;
				s.insert = obj.insert_date;
				s.last_edit = obj.last_edit_date;
				if(_.isString(obj.patient))
					s.patient = getOnlyKey(obj.patient);
				if(_.isString(obj.donor))
					s.donor = getOnlyKey(obj.donor);
			}
			else if(type=="unita"){
				s.collection = obj.collection;
				s.code = obj.code;
				s.processing_facility = obj.processing_facility;
				s.state = tipi.unity.findState(obj);
				s.insert = obj.insert_date;
				s.last_edit = obj.last_edit_date;
			}
			obj.H.searchables = s;
			
			/* Adding auto-complete information into header */
			var a = {};
			if( type == "donatori" ) {
				a['center_donazione'] = obj.provenance_center;
			}
			else if( type == "pazienti" ) {
				a['diagnosis']         = new Array();
				a['therapeutic_cycle'] = new Array();
				a['disease_state']     = new Array();

				var diagnosi = obj.diagnosi != null? obj.diagnosi : new Array();
				for( var i in diagnosi ) {
					if( diagnosi[i].diagnosi != null && diagnosi[i].diagnosi.length > 0 ) {
						a['diagnosis'].push(diagnosi[i].diagnosi);
					}
					
					var therapeutic_cycle = diagnosi[i].therapeutic_cycle != null? diagnosi[i].therapeutic_cycle : new Array();
					
					for( var j in therapeutic_cycle ) {
						if( therapeutic_cycle[j].cycle != null && therapeutic_cycle[j].cycle.length > 0 ) {
							a['therapeutic_cycle'].push( therapeutic_cycle[j].cycle );
						}
						
						if( therapeutic_cycle[j].disease_state != null && therapeutic_cycle[j].disease_state.length > 0 ) {
							a['disease_state'].push( therapeutic_cycle[j].disease_state );
						}
					}
				}
			}
			else if( type == "raccolte" ) {
				var request = obj.request != null? obj.request : {};
				if( request.growth_factor != null && request.growth_factor.length > 0 ) {
					a['growth_factor'] = request.growth_factor;
				}
				if( request.provenance_center != null && request.provenance_center.length > 0 ) {
					a['center_donor'] = request.provenance_center;
				}
				
				var performing = request.performing != null? request.performing : {};
				if( performing.additive != null && performing.additive.length > 0 ) {
					a['additive_collection'] = performing.additive;
				}
				if( performing.separator != null && performing.separator.length > 0 ) {
					a['separator_collection'] = performing.separator;
				}
			}

			obj.H.autocompletes = a;
			
			
			jsOn.set("repo_random-"+type,key,obj);
			return obj;
		}
		}catch(err){
			H.printError(err);
		}
	};
	
	function getOnlyKey(link) {
		return _.isString(link) ? link.substring(link.lastIndexOf("/")+1,link.length) : null;
	};
	
	function synthAddress(address){
		var sep = "; ";
		return address.address+sep+address.postal_code+sep+address.city+sep+address.province+sep+address.country; 
	}
	
	function initRandomRep(){
		initRepTypes();
		
		// prepare links informations... 
		tipi.link.tables = {
			center: "center",
			person: "people",
			donor: "donator",
			patient: "patient",
			collection: "collection",
			unity: "unity"
		};
		tipi.link.repo_random = {
			center: "centri",
			person: "cristiani",
			donor: "donatori",
			patient: "pazienti",
			collection: "raccolte",
			unity: "unita"
		};
		
		// prepare jsOn objects containers... 
		if(!_.is(jsOn.get("repo_random")))
			jsOn.create("repo_random");
		_.each(random_creator, function(fn, key){
			if(!_.is(jsOn.get("repo_random-"+key)))
				jsOn.set("repo_random",key,{});
		});
	}






