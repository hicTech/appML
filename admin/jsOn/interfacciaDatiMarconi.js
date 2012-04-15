function getObjValueMarconi(obj){
	return obj.value().value;
}

function simpleJsonVisualizerMarconi(content){
	var c = content;
	var arr = _.keys(c);
	var html = "";
	for(i in arr){
		var label = getFieldLabel(arr[i]);
		var value = c[arr[i]];
		html+= getWievRow("",label,value);
	}
	return '<div class="VIEW-fieldset">'+ html +'</div>';
}

function getWievRow(type,label,value){
	return '<div class="VIEW-row"><div class="VIEW-label">'+ label +':</div><div class="VIEW-value">'+ value +'</div></div>';
}

function getFieldLabel(v){
	return v;
}


function toReadableDateMarconi(millisec){
	var d = new Date(millisec);
	return d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear()
}

function toReadableAdressMarconi(obj){
	return obj.address+", "+obj.postal_code+" - "+obj.city+", "+obj.province+" "+obj.country
	
}

function toDateMarconi(millisec){
	var d = new Date(millisec);
	return d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear()
}

function toReadableGenderMarconi(v){
	return (v == true) ? "maschio" : "femmina";
}

function getPatientMarconi(){
	return {
		  "name": "Ugo",
		  "surname": "Costabile",
		  "gender": false,
		  "birth_date": -1192912929672,
		  "contacts": {
		    "telefono": "052476635",
		    "cellulare": "+393382232067",
		    "email": "iuvs@apple.com"
		  },
		  "notes": "",
		  "type": 0,
		  "code": "IOBSUUHZ",
		  "birth_place": {
		    "city": "Castrolibero",
		    "province": "Firenze",
		    "postal_code": 37621,
		    "address": "piazza oifda, 90",
		    "country": "Germania"
		  },
		  "residence": {
		    "city": "Cerveteri",
		    "province": "Pescara",
		    "postal_code": 80873,
		    "address": "piazza oufhfiu, 56",
		    "country": "Austria"
		  },
		  "fiscal_code": "QCNUEC98L06L128B",
		  "registration_date": 1128411006686,
		  "last_edit_date": 1270414054062,
		  "diagnosis": [
		    {
		      "diagnosis": "Grave stress",
		      "therapeutic_cycles": [
		        {
		          "cycle": "Stabilizzazione cellulare",
		          "disease_state": "Terminale",
		          "patient_weight": 128.5,
		          "collections": [
		            "/collection/iubboezvniafrsia",
		            "/collection/tbaerpoombuuqvfa"
		          ],
		          "notes": ""
		        },
		        {
		          "cycle": "Potenziamento risposta linfociti",
		          "disease_state": "Grave",
		          "patient_weight": 52.5,
		          "collections": [
		            "/collection/iuhbhaofzcauqdri",
		            "/collection/aaqsmoucqaihshou"
		          ],
		          "notes": "Lorem Ipsum 0: <br/> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  <br/> "
		        },
		        {
		          "cycle": "Potenziamento risposta linfociti",
		          "disease_state": "Recessione avanzata",
		          "patient_weight": 124.5,
		          "collections": [
		            "/collection/qceobzdeulliusvu"
		          ],
		          "notes": "Lorem Ipsum 0: <br/> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  <br/> "
		        }
		      ],
		      "notes": ""
		    },
		    {
		      "diagnosis": "Morbo della mucca pazza",
		      "therapeutic_cycles": [
		        {
		          "cycle": "Stabilizzazione cellulare",
		          "disease_state": "Guarigione",
		          "patient_weight": 127.4,
		          "collections": [
		            "/collection/uagzoorfguenbuis"
		          ],
		          "notes": "Lorem Ipsum 0: <br/>  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  <br/> "
		        }
		      ],
		      "notes": "Lorem Ipsum 0: <br/> Lorem ipsum dolor  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  <br/> "
		    }
		  ],
		  "provenance": {
		    "center": "/center/ddlaarvzeuhhnuur",
		    "division": "Psichiatria"
		  },
		  "H": {
		    "key": "aimmvaopcaetpmoa",
		    "type": "patient",
		    "searchables": {
		      "code": "IOBSUUHZ",
		      "type": 0,
		      "name": "Ugo",
		      "surname": "Costabile",
		      "birth_date": -1192912929672,
		      "birth_place": "piazza oifda, 90; 37621; Castrolibero; Firenze; Germania",
		      "registration": 1128411006686,
		      "last_edit": 1270414054062,
		      "provenance": "ddlaarvzeuhhnuur",
		      "wird": "Psichiatria"
		    }
		  }
		};
}