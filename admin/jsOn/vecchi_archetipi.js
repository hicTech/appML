jsOn.objects.archetipi = {
  "centro": {
    "nome": "string",
    "codice": "string",
    "indirizzo": "address",
    "contatti": "contact",
    "reparti": [
      "string"
    ]
  },
  "user": {
    "user": "string",
    "password": "password",
    "email": "email",
    "aree": [
      {
        "name": "enum({ values:[\\'clinica\\',\\'raccolta\\',\\'manipolazione\\',\\'admin\\',\\'system\\'] })",
        "role": "enum({ values:[\\'view\\',\\'edit\\',\\'manager\\',\\'admin\\'] })"
      }
    ],
    "anagrafica": {
      "nome": "name",
      "cognome": "surname",
      "sesso": "boolean",
      "data_nascita": "date({ min:1900 })",
      "contatti": {
        "telefono": "phone",
        "cellulare": "phone",
        "email": "email"
      },
      "note": "text"
    },
    "centro": "link({ type:'centro' })"
  },
  "paziente": {
    "codice": "string({ auto:'CodicePaziente' })",
    "tipo": "0",
    "nome": "name",
    "cognome": "surname",
    "sesso": "boolean",
    "data_nascita": "date({ min:1900 })",
    "luogo_nascita": {
      "comune": "string",
      "provincia": "string",
      "cap": "string",
      "indirizzo": "string",
      "paese": "string"
    },
    "codice_fiscale": "string({ auto:'fiscalCode' })",
    "contatti": {
      "telefono": "phone",
      "cellulare": "phone",
      "email": "email"
    },
    "residenza": {
      "comune": "string",
      "provincia": "string",
      "cap": "string",
      "indirizzo": "string",
      "paese": "string"
    },
    "data_registrazione": "date({ auto: 'now' })",
    "ultima_modifica": "date({ auto: true })",
    "diagnosi": [
      {
        "diagnosi": "autocomplete({ type:'diagnosi' })",
        "cicli_terapeutici": [
          {
            "ciclo": "autocomplete({ type: 'ciclo_terapeutico' })",
            "stato_malattia": "autocomplete({ type: 'stato_malattia' })",
            "peso_paziente": "number({ number_type:'int', min:0, max:300})",
            "raccolte": [
              "link({ type:'raccolta' })"
            ],
            "note": "text"
          }
        ],
        "note": "text"
      }
    ],
    "provenienza": "link({ type:'centro' })",
    "note": "text"
  },
  "donatore": {
    "codice": "string({ auto:'CodiceDonatore' })",
    "tipo": "1",
    "nome": "name",
    "cognome": "surname",
    "sesso": "boolean",
    "data_nascita": "date({ min:1900 })",
    "luogo_nascita": {
      "comune": "string",
      "provincia": "string",
      "cap": "string",
      "indirizzo": "string",
      "paese": "string"
    },
    "codice_fiscale": "string({ auto:'fiscalCode' })",
    "contatti": {
      "telefono": "phone",
      "cellulare": "phone",
      "email": "email"
    },
    "residenza": {
      "comune": "string",
      "provincia": "string",
      "cap": "string",
      "indirizzo": "string",
      "paese": "string"
    },
    "data_registrazione": "date({ auto: 'now' })",
    "ultima_modifica": "date({ auto: true })",
    "raccolte": [
      "link({ type:'raccolta' })"
    ],
    "centro_provenienza": "autocomplete({ type:'centro_donazione' })",
    "note": "text"
  },
  "raccolta_HPC_M": {
    "codice": "string({ auto:'CodiceRaccolta' })",
    "tipo": "HPC_M",
    "stato": "enum({ values:'collection_states' })",
    "paziente": "link({ type:'paziente' })",
    "donatore": "link({ type:'donatore' })",
    "data_inserimento": "date({ auto:'now' })",
    "ultima_modifica": "date({ auto: true })",
    "collection_facility": "enum({ values:'collection_facilities' })",
    "processing_facility": "enum({ values:'processing_facilities' })",
    "clinica": {
      "data_prevista": "date({ min:'now', range:'6m', hour: true })",
      "dose_target": "number({ notation:'exp', base:'10', exp:'8', measure:'/kg' })",
      "compatibilita_gruppo": "enum({ values:'group_compatibility' })",
      "manipolazioni_richieste": "array({ type:'enum({ values:\\'manipulations_HPC_M\\' })' })",
      "note": "text"
    },
    "idoneita": {
      "gruppo_sanguigno": {
        "paziente": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        },
        "donatore": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        }
      },
      "esami_infettivologici": {
        "anticorpi_anti_RBC": "boolean",
        "HCV_ab": "boolean",
        "HIV_ab": "boolean",
        "HBV_ag": "boolean",
        "TPHA": "boolean",
        "bioHazard": "boolean({ auto:'getBioHazard' })"
      }
    },
    "effettuazione": {
      "inizio_raccolta": "date({ min:'now', hour: true })",
      "fine_raccolta": "date({ min:'now', hour: true })",
      "volume_unita": "number({ measure:'ml' })",
      "volume_ematico_processato": "number({ measure:'ml' })",
      "flusso": "number({ measure:'ml/min' })",
      "ACD": "number({ measure:'ml' })",
      "additivo": "autocomplete({ type:'additivo_raccolta' })",
      "separatore": "autocomplete({ type:'separatore_raccolta' })",
      "manipolazioni_richieste": "enum({ values:\\'manipulations_HPC_A\\'})",
      "note": "text"
    },
    "trasporto": {
      "unita": {
        "scadenza": "date({ min:'now' })",
        "stato_fisico": "enum({ values:['solido','liquido','liquido_post_scongelamento'] })"
      },
      "data_consegna": "date({ auto:'now', hour:true })",
      "note": "text"
    }
  },
  "raccolta_HPC_A": {
    "codice": "string({ auto:'CodiceRaccolta' })",
    "tipo": "HPC_M",
    "stato": "enum({ values:'collection_states' })",
    "paziente": "link({ type:'paziente' })",
    "donatore": "link({ type:'donatore' })",
    "data_inserimento": "date({ auto:'now' })",
    "ultima_modifica": "date({ auto: true })",
    "collection_facility": "enum({ values:'collection_facilities' })",
    "processing_facility": "enum({ values:'processing_facilities' })",
    "clinica": {
      "data_prevista": "date({ min:'now', range:'6m', hour: true })",
      "dose_target": "number({ notation:'exp', base:'10', exp:'6', measure:'/kg' })",
      "compatibilita_gruppo": "enum({ values:'group_compatibility' })",
      "fattore_crescita": "autocomplete({ type:'fattore_crescita' })",
      "dose": "number({ measure:'mcg/kg' })",
      "data_inizio_fattore_crescita": "date({min:'now'})",
      "accessi_vascolari": "enum({values:'vascular_access'})",
      "note": "text"
    },
    "idoneita": {
      "gruppo_sanguigno": {
        "paziente": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        },
        "donatore": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        }
      },
      "esami_infettivologici": {
        "anticorpi_anti_RBC": "boolean",
        "HCV_ab": "boolean",
        "HIV_ab": "boolean",
        "HBV_ag": "boolean",
        "TPHA": "boolean",
        "bioHazard": "boolean({ auto:'getBioHazard' })"
      },
      "idoneita_accessi_venosi": "boolean",
      "test_timing": [
        {
          "data": "date({ min:'now', range:'6m'})",
          "globuli_bianchi": "number({ measure:'ul' })",
          "CD34": "number({ number_type:'percent' })",
          "CD34_ul": "number({ measure:'ul', auto:'getCD34' })",
          "HB": "number({ measure:'g/dl' })",
          "HCT": "number({ number_type:'percent' })",
          "PLT": "number({ measure:'ul' })",
          "MNC": "number({ number_type:'percent' })",
          "NEUT": "number({ number_type:'percent' })",
          "LINFO": "number({ number_type:'percent' })",
          "MONO": "number({ number_type:'percent' })",
          "EOS": "number({ number_type:'percent' })",
          "BASO": "number({ number_type:'percent' })",
          "note": "text",
          "esito_dati": "enum({[ 'positivo', 'da_rivalutare', 'negativo' ]})"
        }
      ]
    },
    "effettuazione": {
      "inizio_raccolta": "date({ min:'now', hour: true })",
      "fine_raccolta": "date({ min:'now', hour: true })",
      "volume_unita": "number({ measure:'ml' })",
      "volume_ematico_processato": "number({ measure:'ml' })",
      "flusso": "number({ measure:'ml/min' })",
      "ACD": "number({ measure:'ml' })",
      "additivo": "autocomplete({ type:'additivo_raccolta' })",
      "separatore": "autocomplete({ type:'separatore_raccolta' })",
      "manipolazioni_richieste": "enum({ values:\\'manipulations_HPC_A\\'})",
      "note": "text"
    },
    "trasporto": {
      "unita": {
        "scadenza": "date({ min:'now' })",
        "stato_fisico": "enum({ values:['solido','liquido','liquido_post_scongelamento'] })"
      },
      "data_consegna": "date({ auto:'now', hour:true })",
      "note": "text"
    }
  },
  "raccolta_TC_T": {
    "codice": "string({ auto:'CodiceRaccolta' })",
    "tipo": "HPC_M",
    "stato": "enum({ values:'collection_states' })",
    "paziente": "link({ type:'paziente' })",
    "donatore": "link({ type:'donatore' })",
    "data_inserimento": "date({ auto:'now' })",
    "ultima_modifica": "date({ auto: true })",
    "collection_facility": "enum({ values:'collection_facilities' })",
    "processing_facility": "enum({ values:'processing_facilities' })",
    "clinica": {
      "data_prevista": "date({ min:'now', range:'6m', hour: true })",
      "dose_target": "number({ notation:'exp', base:'10', exp:{ min:5, max:7 }, measure:'/kg' })",
      "compatibilita_gruppo": "enum({ values:'group_compatibility' })",
      "accessi_vascolari": "enum({values:'vascular_access'})",
      "manipolazioni_richieste": "array({ type:'enum({ values:\\'manipulations_TC_T\\' })' })",
      "note": "text"
    },
    "idoneita": {
      "gruppo_sanguigno": {
        "paziente": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        },
        "donatore": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        }
      },
      "esami_infettivologici": {
        "anticorpi_anti_RBC": "boolean",
        "HCV_ab": "boolean",
        "HIV_ab": "boolean",
        "HBV_ag": "boolean",
        "TPHA": "boolean",
        "bioHazard": "boolean({ auto:'getBioHazard' })"
      },
      "idoneita_accessi_venosi": "boolean"
    },
    "effettuazione": {
      "inizio_raccolta": "date({ min:'now', hour: true })",
      "fine_raccolta": "date({ min:'now', hour: true })",
      "volume_unita": "number({ measure:'ml' })",
      "volume_ematico_processato": "number({ measure:'ml' })",
      "flusso": "number({ measure:'ml/min' })",
      "ACD": "number({ measure:'ml' })",
      "additivo": "autocomplete({ type:'additivo_raccolta' })",
      "separatore": "autocomplete({ type:'separatore_raccolta' })",
      "manipolazioni_richieste": "enum({ values:\\'manipulations_HPC_A\\'})",
      "note": "text"
    },
    "trasporto": {
      "unita": {
        "scadenza": "date({ min:'now' })",
        "stato_fisico": "enum({ values:['solido','liquido','liquido_post_scongelamento'] })"
      },
      "data_consegna": "date({ auto:'now', hour:true })",
      "note": "text"
    }
  },
  "raccolta_esterna": {
    "codice": "string({ auto:'CodiceRaccolta' })",
    "tipo": "HPC_M",
    "stato": "enum({ values:'collection_states' })",
    "paziente": "link({ type:'paziente' })",
    "donatore": "link({ type:'donatore' })",
    "data_inserimento": "date({ auto:'now' })",
    "ultima_modifica": "date({ auto: true })",
    "collection_facility": "enum({ values:'collection_facilities' })",
    "processing_facility": "enum({ values:'processing_facilities' })",
    "clinica": {
      "data_prevista": "date({ min:'now', range:'6m', hour: true })",
      "compatibilita_gruppo": "enum({ values:'group_compatibility' })",
      "codice_donatore": "string",
      "centro_provenienza": "autocomplete({ type:'centro_donatore' })",
      "sesso_donatore": "boolean",
      "clearance_donatore": "enum({ values:'valutation' })",
      "donatore_cmv": "enum({ values:'valutation' })",
      "manipolazioni_richieste": "array({ type:'enum({ values:\\'manipulations\\' })' })",
      "note_trasporto": "text",
      "note": "text"
    },
    "idoneita": {
      "gruppo_sanguigno": {
        "paziente": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        },
        "donatore": {
          "AB0": "enum({ values:['A','B','0'] })",
          "RH": "enum({ values:['+','-'] })",
          "fenotipo_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
          "KELL": "boolean"
        }
      },
      "esami_infettivologici": {
        "anticorpi_anti_RBC": "boolean",
        "HCV_ab": "boolean",
        "HIV_ab": "boolean",
        "HBV_ag": "boolean",
        "TPHA": "boolean",
        "bioHazard": "boolean({ auto:'getBioHazard' })"
      },
      "idoneita_accessi_venosi": "boolean"
    },
    "effettuazione": {
      "inizio_raccolta": "date({ min:'now', hour: true })",
      "fine_raccolta": "date({ min:'now', hour: true })",
      "volume_unita": "number({ measure:'ml' })",
      "volume_ematico_processato": "number({ measure:'ml' })",
      "flusso": "number({ measure:'ml/min' })",
      "ACD": "number({ measure:'ml' })",
      "additivo": "autocomplete({ type:'additivo_raccolta' })",
      "separatore": "autocomplete({ type:'separatore_raccolta' })",
      "manipolazioni_richieste": "enum({ values:\\'manipulations_HPC_A\\'})",
      "note": "text"
    },
    "trasporto": {
      "unita": {
        "scadenza": "date({ min:'now' })",
        "stato_fisico": "enum({ values:['solido','liquido','liquido_post_scongelamento'] })"
      },
      "data_consegna": "date({ auto:'now', hour:true })",
      "note": "text"
    }
  },
  "unita": {
    "accettazione": {
      "data": "date({ auto:'now' })",
      "controlli": {
        "documentazione": "boolean",
        "conservazione": "boolean"
      },
      "caratterizzazione": {
        "globuli_bianchi": "number({ measure:'ul' })",
        "HB": "number({ measure:'g/dl' })",
        "HCT": "number({ number_type:'percent' })",
        "PLT": "number({ measure:'ul' })",
        "MNC": "number({ number_type:'percent' })",
        "CD3": "number({ number_type:'percent' })",
        "CD4": "number({ number_type:'percent' })",
        "CD8": "number({ number_type:'percent' })",
        "CD19": "number({ number_type:'percent' })",
        "NK": "number({ number_type:'percent' })",
        "CD34": "number({ number_type:'percent' })",
        "volume": "number({ measure:'ul' })",
        "note": "text"
      }
    },
    "frazionamento_iniziale": "frazionamento_unita",
    "manipolazione": {
      "manipolazioni": [
        {
          "data": "date({ auto:'now' })",
          "manipolazioni": [
            "enum({ values:\\'manipulations\\' })"
          ],
          "note": "text"
        }
      ],
      "caratterizzazione": {
        "globuli_bianchi": "number({ measure:'ul' })",
        "HB": "number({ measure:'g/dl' })",
        "HCT": "number({ number_type:'percent' })",
        "PLT": "number({ measure:'ul' })",
        "MNC": "number({ number_type:'percent' })",
        "CD3": "number({ number_type:'percent' })",
        "CD4": "number({ number_type:'percent' })",
        "CD8": "number({ number_type:'percent' })",
        "CD19": "number({ number_type:'percent' })",
        "NK": "number({ number_type:'percent' })",
        "CD34": "number({ number_type:'percent' })",
        "volume": "number({ measure:'ul' })",
        "note": "text"
      }
    },
    "frazionamento_post_manipolazione": "frazionamento_unita",
    "criopreservazione": {
      "data": "date({ auto:'now' })",
      "NC": "number({ notation:'exp', base:'10', exp:'9' })",
      "CD34": "number({ notation:'exp', base:'10', exp:'6' })",
      "volume_totale": "number({ measure:'ml' })",
      "crioprotettore": "enum({ values:'cryoprojector' })",
      "crioprotezione": "number({ number_type:'percent', min:0, max:20 })",
      "anticoagulanti": [
        {
          "tipo": "enum({ values:'anticoagulant' })",
          "volume": "number({ measure:'ml' })"
        }
      ],
      "additivi": [
        {
          "tipo": "enum({ values:'additive' })",
          "volume": "number({ measure:'ml' })"
        }
      ],
      "note": "text"
    },
    "stoccaggio": {
      "data": "date({ auto:'now' })",
      "container": "string",
      "tank": "string"
    },
    "scongelamento": {
      "caratterizzazione": {
        "globuli_bianchi": "number({ measure:'ul' })",
        "HB": "number({ measure:'g/dl' })",
        "HCT": "number({ number_type:'percent' })",
        "PLT": "number({ measure:'ul' })",
        "MNC": "number({ number_type:'percent' })",
        "CD3": "number({ number_type:'percent' })",
        "CD4": "number({ number_type:'percent' })",
        "CD8": "number({ number_type:'percent' })",
        "CD19": "number({ number_type:'percent' })",
        "NK": "number({ number_type:'percent' })",
        "CD34": "number({ number_type:'percent' })",
        "volume": "number({ measure:'ul' })",
        "note": "text"
      }
    },
    "richiesta": {
      "data": "date({ auto:'now' })",
      "data_inizio_condizionamento": "date({ min:'now' })",
      "data_reinfusione": "date({ min:'now' })"
    },
    "idoneita": {
      "vitalita_CD34": "string",
      "vitalita_NC": "string",
      "sterilita": "boolean",
      "integrita_sacca": "boolean",
      "note": "text"
    },
    "rilascio": {
      "data": "date({ min:'now', hour:true })",
      "destinazione": "link({type:'centro'})",
      "riferimento": {
        "nome": "string",
        "telefono": "phone"
      },
      "invia_delegato": "boolean"
    },
    "reinfusione": {
      "data": "date({ auto:'now' })",
      "durata": "number({ number_type:'int', 'measure':'min'})",
      "note": "text"
    },
    "attecchimento": {
      "data_PMN": "date({ min:'now' })",
      "data_PLTS": "date({ min:'now' })",
      "note": "text"
    }
  }
}