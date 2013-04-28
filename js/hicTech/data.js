/*
 * ################# DATI APP ITA ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 * ################# DATI APP ITA  ###################
 */



appMLjson = {
    "panels": [{
            "id": "tm",
            "title": "TransplantManager",
            "icon": "tm.png",
            "pages": [{
                    "id": "home_page",
                    "title": "Home",
                    "contents": [
                    	{
                            "type": "paragraph",
                            "text": "<div style='min-height:65px; text-align:left;background-color: #fff;padding: 15px;box-shadow: 0px 2px 7px 1px rgba(0,0,0,0.3);'><img style='width:60px; float:left; margin:0px 15px 0px 0px' src='css/themes/tm/img/logo_tm.png'><b><font style='color:#f00'>Transplant</font><font style='color:#222'>Manager</font></b>  segue il <b>programma trapianti</b> di cellule staminali dall'ingresso in <b>Reparto</b> del <b>Paziente</b> fino all'attecchimento del <b>trapianto</b></div>"
                        }, 
                        {
                            "type": "carousel",
                            "items_type": "foto",
                            "prePath": "img/interior",
                            "sizes": {
                                "tablet": {
                                    "width": "580",
                                    "height": "386"
                                },
                                "desktop": {
                                    "width": "700",
                                    "height": "465"
                                },
                                "smartphone": {
                                    "width": "310",
                                    "height": "206"
                                }
                            },
                            "items": [{
                                    "url": "1.jpg",
                                }, {
                                    "url": "2.jpg",
                                }, {
                                    "url": "3.jpg",
                                }, {
                                    "url": "4.jpg",
                                }, {
                                    "url": "5.jpg",
                                }, {
                                    "url": "6.jpg",
                                }, {
                                    "url": "7.jpg",
                                }, {
                                    "url": "8.jpg",
                                }, {
                                    "url": "9.jpg",
                                }, {
                                    "url": "10.jpg",
                                }
                            ]
                        },
                        {
                            "type": "menu",
                            "className": "arrow_list",
                            "title": "TransplantManager offre",
                            "items": [{
                                    "className": "arrow",
                                    "linked_page_id": "tre_facility",
                                    "label": "Tre Facility Separate",
                                    "icon_path": "css/general/img/features/tre_facility.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "flusso",
                                    "label": "Flusso Completo",
                                    "icon_path": "css/general/img/features/flusso.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "documenti",
                                    "label": "Documenti Editabili",
                                    "icon_path": "css/general/img/features/documenti.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "firma",
                                    "label": "Firma Digitale",
                                    "icon_path": "css/general/img/features/firma.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "magazzino",
                                    "label": "Gestione Magazzino",
                                    "icon_path": "css/general/img/features/magazzino.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "notifiche",
                                    "label": "Notifiche e Promemoria",
                                    "icon_path": "css/general/img/features/notifiche.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "tank",
                                    "label": "Gestione Tank",
                                    "icon_path": "css/general/img/features/tank.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "tracciabilita",
                                    "label": "Tracciabilit&agrave;",
                                    "icon_path": "css/general/img/features/tracciabilita.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "etichette",
                                    "label": "Stampa Etichette",
                                    "icon_path": "css/general/img/features/barcode.png"
                                }, {
                                    "className": "arrow",
                                    "linked_page_id": "grafico",
                                    "label": "Visualizzazione Grafico",
                                    "icon_path": "css/general/img/features/grafico.png"
                                }
                            ]
                        },
                        {
                            "type": "paragraph",
                            "text": "<div>&nbsp;</div>"
                        }
                    ]
                },{
                    "id": "documenti",
                    "title": "Documenti Editabili",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/documenti.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Documenti Editabili</h1><br>Sia per gli standard JACIE che per le vigenti leggi (ad esempio il D.Lgs 191/07) è fondamentale la tracciabilità delle attività legate all'esecuzione del trapianto. <br><br>Molti dei documenti segueno la cartella clinica del paziente ed altri vanno a seguire la regolamentazione trasfusionale. <br><br>Tutti i documenti possono essere gestiti da TransplantManager; in particolare, sono fondamentali tutti i documenti che prevedono le idoneità dei pazienti/donatori, i referti della raccolta di cellule staminali e la documentazione che è necessaria per la registrazione di tutte le attività svolte durante tutto il ciclo trapiantologico.</div></div>"
                        }
                    ]
                }, {
                    "id": "magazzino",
                    "title": "Gestione Magazzino",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/magazzino.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Gestione Magazzino</h1><br>La gestione del magazzino permette di integrare in un unico sistema informatico le attività che, in genere vengono gestite mediante complicati programmi gestionali. <br><br>Il materiale finalizzato alle attività trapiantologiche, con particolare riferimento alla raccolta ed alla processazione, sarà gestito e 'riversato' sulla modulistica in automatico, senza la necessità di riportare codici, quantità, lotti, ecc, spesso in maniera manuale, riducendo gli errori di trascrizione</div></div>"
                        }
                    ]
                }, {
                    "id": "notifiche",
                    "title": "Notifiche e Promemoria",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/notifiche.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Notifiche e Promemoria</h1><br>Ogni utilizzatore avrà una pagina personale dove saranno rappresentate tutte le attività svolte e da svolgere per l'esecuzione dell'attività trapiantologica. <br><br>Tale possibilità facilita la programmazione delle procedure, garantendo un'ottimizzazione delle risorse e del tempo</div></div>"
                        }
                    ]
                }, {
                    "id": "tank",
                    "title": "Gestione Tank",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/stoccaggio.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Gestione Tank</h1><br>Lo stoccaggio delle unità rappresenta spesso un problema, sia per gli spazi occupati, sia per la registrazione delle posizioni. <br><br>Altro problema può essere rappresentato dal reperimento degli spazi freddi liberi e dal monitoraggio della disponibilità degli stessi. <br><br>TransplantManager permette il reperimento automatico della posizione di stoccaggio, la registrazione delle posizioni delle unità ed il monitoraggio della percentuale di occupazione degli spazi freddi</div></div>"
                        }
                    ]
                }, {
                    "id": "tracciabilita",
                    "title": "Tracciabilit&agrave; Completa",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/tracciabilita.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>tracciabilità Completa</h1><br>Il Decreto Legislativo n. 16 del 25 gennaio 2010, il Decreto Legislativo n. 191 del 6 novembre 2007 che, a sua volta, attua la direttiva 2004/23/CE regolano le norme relative alla tracciabilità.<br><br> In particolare, l'articolo 8 del decreto 191/07 cita 'Gli istituti dei tessuti conservano i dati necessari ad assicurare la tracciabilità in tutte le fasi. I dati richiesti ai fini della completa tracciabilità sono conservati per un periodo minimo di trenta anni dopo l'uso clinico.<br><br> L'archiviazione dei dati può avvenire anche in forma elettronica.' TransplantManager risponde a queste necessità, unendo la funzionalità con la necessità di archiviazione e conservazione dei documenti</div></div>"
                        }
                    ]
                }, {
                    "id": "firma",
                    "title": "Firma Digitale",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/firma_digitale.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Firma Digitale</h1><br>La firma elettronica è usata ormai nella maggior parte delle strutture sanitarie e facilita lo scambio di documenti che, mediante la sua apposizione, acquisiscono valore legale. <br><br> Con TransplantManager può essere utilizzata qualunque modalità di firma digitale, sia istituzionale che personale dando la possibilità, dunque, di realizzare un archivio informatico che possa rispettare i requisiti di legge.</div></div>"
                        }
                    ]
                }, {
                    "id": "etichette",
                    "title": "Stampa Etichette",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/barcode.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Stampa Etichette</h1><br>In accordo con le normative e con gli standard, le etichette prodotte presentano tutti i dati richiesti. <br><br>In particolare, sono presenti le seguenti informazioni: per l'identificazione della donazione il numero unico d'identificazione della donazione; e l'identificazione del Centro; Per l'dentificazione del prodotto il codice univoco (che può essere prodotto dal software o acquisito da altri software, il numero specifico della sottounità, la data del prelievo, la data di scadenza, gli additivi e le sostanze utilizzate durante la raccolta e la manipolazione, le modalità di uso e conservazione. <br><br>TransplantManager produce, inoltre, anche le etichette da utilizzare su provette per le attività di caratterizzazione e qualificazione delle unità e da apporre su eventuali campioni satelliti.</div></div>"
                        }
                    ]
                }, {
                    "id": "tre_facility",
                    "title": "Tre Facility Separate",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style=' width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/tre_aree.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Tre Facility Separate</h1><br>In una struttura complessa come un 'Programma Trapianti', una delle difficoltà organizzative può essere rappresentata dalle comunicazioni tra le tre facilities coinvolte nell'esecuzione del trapianto.<br><br> Mediante TransplantManager le comunicazioni avvengono in tempo reale, sono tracciate e permettono lo scambio di informazioni facilitando l'organizzazione di un trapianto di cellule staminali.</div></div>"
                        }
                    ]
                }, {
                    "id": "flusso",
                    "title": "Flusso Completo",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/flusso.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Flusso Completo</h1><br>Il software permette di coordinare tutte le attività previste, dal reclutamento del paziente o del donatore per l'esecuzione del trapianto all'attecchimento dello stesso, passando attraverso i vari cicli di chemioterapia, di mobilizzazione, di esecuzione della raccolta, della processazione e dello stoccaggio.<br><br> Un'importante funzione è rappresentata dalla possibilità di effettuare informaticamente la richiesta di trapianto, autologo o allogenico, mediante la modulistica informatizzata, scegliendo le unità necessarie fra quelle monitorate attraverso il software.</div></div>"
                        }
                    ]
                }, {
                    "id": "grafico",
                    "title": "Visualizzazione Grafico",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:90px'><div style='width:280px; margin:20px auto;'><img style='border: solid 3px #fff; width:280px;box-shadow: 7px -5px 17px -1px rgba(0,0,0,0.4); margin:0px 0px 0px -4px' src='css/general/img/screenshot/vista_grafico.png'></div><div style='background-color: #fff;padding: 10px; line-height:19px;box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.5)'><h1 style='text-align:center'>Visualizzazione Grafico</h1><br>TransplantManager facilità la gestione del paziente mettendo in evidenza, mediante una rappresentazione grafica particolarmente intuitiva, tutti gli eventi nel quale il paziente è stato coinvolto.<br><br> Tale funzione permette un monitoraggio di base rapido ed accurato, pemettendo di agire in tempo reale su eventuali ritardi o omissioni durante le attività finalizzate al trapianto</div></div>"
                        }
                    ]
                }

            ]
        },

      
        {
            "id": "contatti",
            "title": "Contatti",
            "icon": "contatti.png",
            "pages": [

                {
                    "id": "eventi",
                    "title": "Titolo pag1",
                    "contents": [{
                            "type": "paragraph",
                            "text": "<div style='min-height:35px; text-align:left;background-color: #fff;padding: 15px;box-shadow: 0px 2px 7px 1px rgba(0,0,0,0.3)'>Lo staff di <b><font style='color:#f00'>Transplant</font><font style='color:#222'>Manager</font></b> è a sua completa disposizione</div>"
                       },
                       {
							"type": "button",
							"label": "Scriva al nostro staff",
							"mailTo": "info@transplantmanager.com",
						},
						{
                            "type": "paragraph",
                            "text": '<div style="text-align:center; margin:-5px 0px -40px 0px">info@transplantmanager.com</div>'
                       }
						,
                       {
							"type": "button",
							"label": "Chiama 800 97 65 23",
							"telTo": "800976523",
							"classButton" : "greenButton"
						},
						{
                            "type": "paragraph",
                            "text": '<div style="text-align:center; margin-top:-5px">Dal Lunedi al Venerdi dalle 10:00 alle 18:00</div>'
                       }
                    ]
                }
            ]
        }
    ]
}



/*
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 * ################# OPTIONS APP ###################
 */
var options = { 
		spinning_loading_options : {
				  lines: 11, // The number of lines to draw
				  length: 3, // The length of each line
				  width: 3, // The line thickness
				  radius: 7, // The radius of the inner circle
				  rotate: 0, // The rotation offset
				  color: '#fff', // #rgb or #rrggbb
				  speed: 1, // Rounds per second
				  trail: 38, // Afterglow percentage
				  shadow: false, // Whether to render a shadow
				  hwaccel: false, // Whether to use hardware acceleration
				  className: 'spinner', // The CSS class to assign to the spinner
				  zIndex: 2e9, // The z-index (defaults to 2000000000)
				  top: 'auto', // Top position relative to parent in px
				  left: 'auto' // Left position relative to parent in px
		},
		loading_timeout : 25000, // milliseconds after force overlay hidding
		initial_loading_fake_delay:(!! urlParameters.initial_loading_fake_delay) ? urlParameters.initial_loading_fake_delay : 150,
		sidebar:(!! urlParameters.sidebar) ? urlParameters.sidebar : "26%",
		sidebarScrollable:false,
		dataValidation: true, // check for id duplications, link consistency etc...
		add2HomeTooltip: true,
		refreshOnOrientationChange: true,
		forcedStartingPage: (!! urlParameters.forcedStartingPage) ? urlParameters.forcedStartingPage : null
	};

/* merge defaults and options, without modifying defaults */
var appMLconf = $.extend({}, appMLconf, options);