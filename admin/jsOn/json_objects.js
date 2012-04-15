jsOn.objects = 
{
"system":{
  "types": {
    "address": {
      "city": "string",
      "province": "string",
      "postal_code": "string",
      "address": "string",
      "country": "string"
    },
    "contact": {
      "phone": "phone",
      "mobile_phone": "phone",
      "email": "email"
    },
    "person": {
      "fields": {
        "name": "name",
        "surname": "surname",
        "gender": "boolean",
        "birth_date": "date({ min:1900 })",
        "contacts": "contact",
        "notes": "text"
      },
      "static": {
        "actions": {
          "new": {
            "name": "name",
            "surname": "surname",
            "gender": "boolean",
            "birth_date": "date({ min:1900 })",
            "contacts": "contact",
            "notes": "text"
          }
        }
      },
      "actions": {
        "edit": {
          "name": "name",
          "surname": "surname",
          "gender": "boolean",
          "birth_date": "date({ min:1900 })",
          "contacts": "contact",
          "notes": "text"
        },
        "trash": {},
        "restore": {},
        "delete": {}
      },
      "searchables": {
        "name": "name",
        "surname": "surname"
      }
    },
    "transplant_person": {
      "extends": "person",
      "static": {
        "actions": {
          "new": {
            "name": "name",
            "surname": "surname",
            "type": "int({ min:0, max:1 })",
            "birth_date": "date({ min:1900 })",
            "birth_place": "address",
            "gender": "boolean",
            "residence": "address",
            "fiscal_code": "string({ auto:'fiscalCode' })",
            "contacts": "contact",
            "notes": "text"
          }
        }
      },
      "fields": {
        "type": "int({ min:0, max:1 })",
        "code": "string",
        "birth_place": "address",
        "residence": "address",
        "fiscal_code": "string({ auto:'fiscalCode' })",
        "registration_date": "date({ auto: 'now' })",
        "last_edit_date": "date({ auto: true })"
      },
      "actions": {
        "edit": {
          "name": "name",
          "surname": "surname",
          "birth_date": "date({ min:1900 })",
          "birth_place": "address",
          "gender": "boolean",
          "residence": "address",
          "fiscal_code": "string({ auto:'fiscalCode' })",
          "contacts": "contact",
          "notes": "text"
        },
        "trash": {},
        "restore": {},
        "add_diagnosis": {
          "diagnosis": "autocomplete({ type:'diagnosis' })",
          "notes": "text"
        },
        "delete": {}
      },
      "searchables": {
        "code": "code",
        "type": "type",
        "birth_date": "birth_date",
        "birth_place": "birth_place",
        "provenance": "getProvenance",
        "provenance_division": "getProvenanceDivision",
        "registration_date": "registration_date",
        "last_edit_date": "last_edit_date"
      }
    },
    "center": {
      "name": "string",
      "code": "string",
      "address": "address",
      "contacts": "contact",
      "divisions": "array({ type:'string' })"
    },
    "user": {
      "extends": "person",
      "fields": {
        "user": "string",
        "password": "password",
        "email": "email",
        "roles": "array({ type:'user_role' })",
        "center": "link({ type:'center' })",
        "division": "string"
      }
    },
    "user_role": {
      "area": "ACL_area",
      "role": "ACL_role"
    },
    "ACL_area": {
      "is": "enum",
      "values": [
        "clinic",
        "collection",
        "manipulation",
        "admin",
        "system"
      ]
    },
    "ACL_role": {
      "is": "enum",
      "values": [
        "view",
        "edit",
        "manager",
        "admin"
      ]
    },
    "patient": {
      "extends": "transplant_person",
      "static": {
        "actions": {
          "new": {
            "extends": "super",
            "arg": {
              "extends": "super",
              "type": "int({ auto:0 })"
            }
          }
        }
      },
      "fields": {
        "code": "string({ auto:'codepatient' })",
        "type": "int({ auto: 0 })",
        "diagnosis": "array({ type:'diagnosis' })",
        "provenance": "link({ type:'center' })"
      }
    },
    "donor": {
      "extends": "transplant_person",
      "static": {
        "actions": {
          "new": {
            "extends": "super",
            "arg": {
              "extends": "super",
              "type": "int({ auto:1 })"
            }
          }
        }
      },
      "fields": {
        "code": "string({ auto:'codedonor' })",
        "type": "int({ auto: 1 })",
        "collections": "array({ type: 'link({ type:\\'collection\\' })' })",
        "provenance_center": "autocomplete({ type:'center_donazione' })"
      }
    },
    "diagnosis": {
      "fields": {
        "diagnosis": "autocomplete({ type:'diagnosis' })",
        "therapeutic_cycles": "array({ type:'therapeutic_cycle' })",
        "notes": "text"
      },
      "actions": {
        "edit": {
          "diagnosis": "autocomplete({ type:'diagnosis' })",
          "notes": "text"
        },
        "add_cycle": {
          "cycle": "autocomplete({ type: 'therapeutic_cycle' })",
          "disease_state": "autocomplete({ type: 'disease_state' })",
          "patient_weight": "number({ number_type:'int', min:0, max:300})",
          "notes": "text"
        },
        "delete": {}
      }
    },
    "therapeutic_cycle": {
      "fields": {
        "cycle": "autocomplete({ type: 'therapeutic_cycle' })",
        "disease_state": "autocomplete({ type: 'disease_state' })",
        "patient_weight": "number({ number_type:'int', min:0, max:300})",
        "collections": "array({ type: 'link({ type:\\'collection\\' })' })",
        "notes": "text"
      },
      "actions": {
        "edit": {
          "cycle": "autocomplete({ type: 'therapeutic_cycle' })",
          "disease_state": "autocomplete({ type: 'disease_state' })",
          "patient_weight": "number({ number_type:'int', min:0, max:300})",
          "notes": "text"
        },
        "delete": {},
        "request_hpc_m": {
          "patient": "link({ type:'patient' })",
          "donor": "link({ type:'donor' })",
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "target_dose": "number({ notation:'exp', base:'10', exp:'8', measure:'/kg' })",
          "requested_manipulations": "array({ type:'manipulations_HPC_M' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes": "text"
        },
        "request_hpc_a": {
          "patient": "link({ type:'patient' })",
          "donor": "link({ type:'donor' })",
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "growth_factor": "autocomplete({ type:'growth_factor' })",
          "dose": "number({ measure:'mcg/kg' })",
          "growth_factor_start_date": "date({min:'now'})",
          "vascular_access": "vascular_access",
          "target_dose": "number({ notation:'exp', base:'10', exp:'6', measure:'/kg' })",
          "requested_manipulations": "array({ type:'manipulations_HPC_A' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes": "text"
        },
        "request_tc_t": {
          "patient": "link({ type:'patient' })",
          "donor": "link({ type:'donor' })",
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "vascular_access": "vascular_access",
          "target_dose": "number({ notation:'exp', base:'10', exp:{ min:5, max:7 }, measure:'/kg' })",
          "requested_manipulations": "array({ type:'manipulations_TC_T' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes": "text"
        },
        "request_ext": {
          "patient": "link({ type:'patient' })",
          "donor": "link({ type:'donor' })",
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "code_donor": "string",
          "provenance_center": "autocomplete({ type:'center_donor' })",
          "gender_donor": "boolean",
          "clearance_donor": "valutation",
          "donor_cmv": "valutation",
          "requested_manipulations": "array({ type:'manipulations' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes_transport": "text",
          "notes": "text"
        }
      }
    },
    "collection_type": {
      "is": "enum",
      "values": [
        "HPC_M",
        "HPC_A",
        "TC_T",
        "CB"
      ]
    },
    "collection_state": {
      "is": "enum",
      "values": [
        "requested",
        "not_suitable",
        "suitable",
        "performed"
      ]
    },
    "collection_facility": {
      "is": "enum",
      "values": [
        "Ospedale RaccogliAmo",
        "GetBlood s.p.a.",
        "OP Bambin GesÃ¹",
        "Ospedale Annunziata CS",
        "CryoLab"
      ]
    },
    "processing_facility": {
      "is": "enum",
      "values": [
        "ManipulBlood",
        "CryoBlood",
        "CryoLab",
        "Casaniella"
      ]
    },
    "group_compatibility": {
      "is": "enum",
      "values": [
        "none",
        "greater",
        "minor",
        "bidirectional"
      ]
    },
    "vascular_access": {
      "is": "enum",
      "values": [
        "peripheral veins",
        "central_venous_catheter"
      ]
    },
    "valutation": {
      "is": "enum",
      "values": [
        "positive",
        "negative",
        "waiting"
      ]
    },
    "collection": {
      "fields": {
        "code": "string({ auto:'codecollection' })",
        "type": "collection_type",
        "state": "collection_state",
        "patient": "link({ type:'patient' })",
        "donor": "link({ type:'donor' })",
        "insert_date": "date({ auto:'now' })",
        "last_edit_date": "date({ auto: true })",
        "collection_facility": "'collection_facility",
        "processing_facility": "processing_facility",
        "performing": "collection_performing",
        "transport": "transport_info",
        "files": {
          "preliminar_label": "file",
          "definitive_label": "file",
          "transport_document": "file",
          "filled_transport_document": "file",
          "signed_transport_document": "file"
        }
      },
      "actions": {
        "edit": {
          "code": "string()",
          "state": "collection_state",
          "patient": "link({ type:'patient' })",
          "donor": "link({ type:'donor' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility"
        },
        "delete": {},
        "start_collection": {
          "date": "date({hour:true, auto:'now'})",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility"
        },
        "preliminary_label": {},
        "end_collection": {
          "date": "date({hour:true, auto:'now'})",
          "volume_unity": "number({ measure:'ml' })",
          "processed_blood_volume": "number({ measure:'ml' })",
          "flow": "number({ measure:'ml/min' })",
          "ACD": "number({ measure:'ml' })",
          "additive": "autocomplete({ type:'additive_collection' })",
          "separator": "autocomplete({ type:'separator_collection' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes": "text"
        },
        "definitive_label": {},
        "release": {
          "arg": "transport_info"
        },
        "transport_document": {
          "version": "enum({values:['model','compiled','signed']})",
          "file": "file"
        }
      },
      "searchables": {
        "code": "code",
        "type": "type",
        "collection_facility": "collection_facility",
        "state": "state",
        "insert_date": "insert_date",
        "last_edit_date": "last_edit_date",
        "patient": "patient",
        "donor": "donor"
      }
    },
    "collection_HPC_M": {
      "extends": "collection",
      "fields": {
        "request": "collection_request_HPC_M",
        "suitability": "suitability_collection"
      },
      "actions": {
        "suitability": {
          "arg": "suitability_collection"
        }
      }
    },
    "collection_HPC_A": {
      "extends": "collection",
      "fields": {
        "request": "collection_request_HPC_A",
        "suitability": "suitability_collection_apheresis"
      },
      "actions": {
        "suitability": {
          "arg": "suitability_collection_with_vascular_access"
        }
      }
    },
    "collection_TC_T": {
      "extends": "collection",
      "fields": {
        "request": "collection_request_TC_T",
        "suitability": "suitability_collection_with_vascular_access"
      },
      "actions": {
        "suitability": {
          "arg": "suitability_collection_with_vascular_access"
        }
      }
    },
    "collection_external": {
      "extends": "collection",
      "fields": {
        "request": "collection_request_external"
      }
    },
    "collection_request": {
      "expected_date": "date({ min:'now', range:'6m', hour: true })",
      "group_compatibility": "group_compatibility",
      "notes": "text"
    },
    "collection_request_HPC_M": {
      "extends": "collection_request",
      "fields": {
        "target_dose": "number({ notation:'exp', base:'10', exp:'8', measure:'/kg' })",
        "requested_manipulations": "array({ type:'manipulations_HPC_M' })"
      },
      "actions": {
        "edit": {
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "target_dose": "number({ notation:'exp', base:'10', exp:'8', measure:'/kg' })",
          "requested_manipulations": "array({ type:'manipulations_HPC_M' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes": "text"
        },
        "delete": {}
      }
    },
    "collection_request_HPC_A": {
      "extends": "collection_request",
      "fields": {
        "growth_factor": "autocomplete({ type:'growth_factor' })",
        "dose": "number({ measure:'mcg/kg' })",
        "growth_factor_start_date": "date({min:'now'})",
        "vascular_access": "vascular_access",
        "target_dose": "number({ notation:'exp', base:'10', exp:'6', measure:'/kg' })",
        "requested_manipulations": "array({ type:'manipulations_HPC_A' })"
      },
      "actions": {
        "edit": {
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "growth_factor": "autocomplete({ type:'growth_factor' })",
          "dose": "number({ measure:'mcg/kg' })",
          "growth_factor_start_date": "date({min:'now'})",
          "vascular_access": "vascular_access",
          "target_dose": "number({ notation:'exp', base:'10', exp:'6', measure:'/kg' })",
          "requested_manipulations": "array({ type:'manipulations_HPC_A' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes": "text"
        },
        "delete": {}
      }
    },
    "collection_request_TC_T": {
      "extends": "collection_request",
      "fields": {
        "vascular_access": "vascular_access",
        "target_dose": "number({ notation:'exp', base:'10', exp:{ min:5, max:7 }, measure:'/kg' })",
        "requested_manipulations": "array({ type:'manipulations_TC_T' })"
      },
      "actions": {
        "edit": {
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "vascular_access": "vascular_access",
          "target_dose": "number({ notation:'exp', base:'10', exp:{ min:5, max:7 }, measure:'/kg' })",
          "requested_manipulations": "array({ type:'manipulations_TC_T' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes": "text"
        },
        "delete": {}
      }
    },
    "collection_request_external": {
      "extends": "collection_request",
      "fields": {
        "code_donor": "string",
        "provenance_center": "autocomplete({ type:'center_donor' })",
        "gender_donor": "boolean",
        "clearance_donor": "valutation",
        "donor_cmv": "valutation",
        "requested_manipulations": "array({ type:'manipulations' })",
        "notes_transport": "text"
      },
      "actions": {
        "edit": {
          "expected_date": "date({ min:'now', range:'6m', hour: true })",
          "group_compatibility": "group_compatibility",
          "code_donor": "string",
          "provenance_center": "autocomplete({ type:'center_donor' })",
          "gender_donor": "boolean",
          "clearance_donor": "valutation",
          "donor_cmv": "valutation",
          "requested_manipulations": "array({ type:'manipulations' })",
          "collection_facility": "collection_facility",
          "processing_facility": "processing_facility",
          "notes_transport": "text",
          "notes": "text"
        },
        "delete": {}
      }
    },
    "suitability_collection": {
      "fields": {
        "blood_group": {
          "donor": "blood_group",
          "receiving": "blood_group"
        },
        "infections_tests": {
          "antibodies_anti_RBC": "boolean",
          "HCV_ab": "boolean",
          "HIV_ab": "boolean",
          "HBV_ag": "boolean",
          "TPHA": "boolean",
          "bioHazard": "boolean({ auto:'getBioHazard' })"
        }
      },
      "actions": {
        "edit": {
          "arg": "suitability_collection"
        },
        "delete": {}
      }
    },
    "blood_group": {
      "AB0": "enum({ values:['A','B','0'] })",
      "RH": "enum({ values:['+','-'] })",
      "fenotype_RH": "enum({ values:['CcDee','CCDee','CcDEe','ccdee'] })",
      "KELL": "boolean"
    },
    "suitability_collection_with_vascular_access": {
      "extends": "suitability_collection",
      "fields": {
        "suitability_vascular_access": "boolean"
      },
      "actions": {
        "edit": {
          "arg": "suitability_collection_with_vascular_access"
        }
      }
    },
    "suitability_collection_apheresis": {
      "extends": "suitability_collection_with_vascular_access",
      "fields": {
        "timing_tests": "array({ type: 'link({ type:\\'timing_test\\' })' })"
      },
      "actions": {
        "add_timing_test": {
          "arg": "timing_test"
        }
      }
    },
    "timing_test": {
      "fields": {
        "date": "date({ min:'now', range:'6m'})",
        "white_blood_cells": "number({ measure:'ul' })",
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
        "notes": "text",
        "result": "enum({ values:[ 'positive', 'to_revalue', 'negative' ]})"
      },
      "actions": {
        "edit": {
          "arg": "timing_test"
        },
        "delete": {}
      }
    },
    "collection_performing": {
      "fields": {
        "start_collection": "date({ min:'now', hour: true })",
        "end_collection": "date({ min:'now', hour: true })",
        "volume_unity": "number({ measure:'ml' })",
        "processed_blood_volume": "number({ measure:'ml' })",
        "flow": "number({ measure:'ml/min' })",
        "ACD": "number({ measure:'ml' })",
        "additive": "autocomplete({ type:'additive_collection' })",
        "separator": "autocomplete({ type:'separator_collection' })",
        "notes": "text"
      },
      "actions": {
        "edit": {
          "arg": "collection_performing"
        },
        "delete": {}
      }
    },
    "transport_info": {
      "fields": {
        "unity": {
          "expiration": "date({ min:'now' })",
          "physical_state": "enum({ values:['solid','liquid','liquid_after_unfreezing'] })"
        },
        "date_delivery": "date({ auto:'now', hour:true })",
        "notes": "text"
      },
      "actions": {
        "edit": {
          "arg": "transport_info"
        },
        "delete": {}
      }
    },
    "unity_state": {
      "is": "enum",
      "values": [
        "accepted",
        "manipulated",
        "freezed",
        "stored",
        "unfreezed",
        "request",
        "suitable",
        "released",
        "reinfused",
        "engrafted",
        "fractionated",
        "assemblata"
      ]
    },
    "manipulation": {
      "extends": "enum",
      "static": {
        "fields": {
          "unity_type": "collection_type",
          "freezed_unity": "boolean"
        }
      },
      "possible_values": [
        "filtration",
        "density_gradient",
        "buffy_coat_preparation",
        "plasma_removal",
        "erythrocytes_removal",
        "negative_selection",
        "positive_selection",
        "freezing",
        "unfreezing"
      ]
    },
    "manipulation_HPC_M": "manipulation({ unity_type: 'HPC_M' })",
    "manipulations_HPC_A": "manipulation({ unity_type: 'HPC_A' })",
    "manipulations_TC_T": "manipulation({ unity_type: 'TC_T' })",
    "cryoprotector": {
      "is": "enum",
      "values": [
        "DCM0",
        "PSp2"
      ]
    },
    "anticoagulant": {
      "is": "enum",
      "values": [
        "eparina",
        "pirivillina",
        "mesolina",
        "pischellina"
      ]
    },
    "additive": {
      "is": "enum",
      "values": [
        "saurina",
        "taurina",
        "caffeina",
        "saccarosio"
      ]
    },
    "unity": {
      "static": {
        "actions": {
          "assemble": {
            "unities": "array({ type:'link({type: \\'unity\\'})'  })"
          }
        }
      },
      "fields": {
        "code": "string({ auto:'codeunity' })",
        "state": "unity_state",
        "insert_date": "date({ auto:'now' })",
        "last_edit_date": "date({ auto: true })",
        "processing_facility": "processing_facility",
        "creation": {
          "date": "date({ min:'now' })",
          "unity": "array({ type:'link({ type: \\'unity\\'})' })",
          "collection": "link({ type:'collection' })"
        },
        "acceptance": {
          "date": "date({ auto:'now' })",
          "checks": {
            "documentation": "boolean",
            "conservation": "boolean"
          }
        },
        "initial_characterization": "unity_characterization",
        "manipulations": "array({ type: 'link({ type:\\'unity_manipulation\\' })' })",
        "characterization_after_manipulation": "unity_characterization",
        "freezing": {
          "date": "date({ auto:'now' })",
          "NC": "number({ notation:'exp', base:'10', exp:'9' })",
          "CD34": "number({ notation:'exp', base:'10', exp:'6' })",
          "total_volume": "number({ measure:'ml' })",
          "cryoprotector": "cryoprotector",
          "cryoprotection": "number({ number_type:'percent', min:0, max:20 })",
          "anticoagulants": "array({ type: 'anticoagulant' })",
          "additives": "array({ type: 'additive' })",
          "notes": "text"
        },
        "storage": {
          "date": "date({ auto:'now' })",
          "container": "string",
          "tank": "string"
        },
        "unfreezing": {
          "date": "date({ auto:'now' })"
        },
        "characterization_after_unfreezing": "unity_characterization",
        "request": {
          "date": "date({ auto:'now' })",
          "date_start_condizionamento": "date({ min:'now' })",
          "date_reinfusione": "date({ min:'now' })"
        },
        "suitability": {
          "date": "date({ auto:'now' })",
          "vitality_CD34": "number({ number_type:'percent' })",
          "vitality_NC": "number({ number_type:'percent' })",
          "sterility": "boolean",
          "bag_integrity": "boolean",
          "notes": "text"
        },
        "release": {
          "date": "date({ min:'now', hour:true })",
          "destination": "link({type:'center'})",
          "reference": "link({type:'person'})",
          "send_delegate": "boolean",
          "notes": "text"
        },
        "reinfusion": {
          "date": "date({ auto:'now' })",
          "duration": "number({ number_type:'int', 'measure':'minuti'})",
          "notes": "text"
        },
        "engraftment": {
          "date": "date({ auto:'now' })",
          "date_PMN": "date({ min:'now' })",
          "date_PLTS": "date({ min:'now' })",
          "notes": "text"
        },
        "fractionation": {
          "date": "date({ min:'now' })",
          "fractions": {
            "is": "array",
            "type": {
              "fraction": "number({ number_type: 'int', auto: true })",
              "percentage": "number({ number_type: 'percent' })"
            }
          },
          "notes": "text"
        },
        "assembly": {
          "date": "date({ min:'now' })",
          "unity": "link({ type: 'unity'})",
          "notes": "text"
        },
        "files": {}
      },
      "actions": {
        "edit": {
          "code": "string({ auto:'codeunity' })",
          "state": "unity_state",
          "processing_facility": "processing_facility"
        },
        "delete": {},
        "accept": {
          "arg": "unity/acceptance"
        },
        "characterize": {
          "arg": "unity_characterization"
        },
        "manipulate": {
          "arg": "unity_manipulation"
        },
        "freeze": {
          "arg": "unity/freezing"
        },
        "store": {
          "arg": "unity/storage"
        },
        "unfreeze": {
          "arg": "unity/unfreezing"
        },
        "request": {
          "arg": "unity/request"
        },
        "release": {
          "arg": "unity/release"
        },
        "suitable": {
          "arg": "unity/suitability"
        },
        "reinfusion": {
          "arg": "unity/reinfusion"
        },
        "engraftment": {
          "arg": "unity/engraftment"
        },
        "fractionate": {
          "arg": "unity/fractionation"
        }
      },
      "searchables": {
        "code": "code",
        "state": "state",
        "processing_facility": "processing_facility",
        "insert_date": "insert_date",
        "last_edit_date": "last_edit_date",
        "collection": "collection"
      }
    },
    "unity_characterization": {
      "white_blood_cells": "number({ measure:'ul' })",
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
      "volume": "number({ measure:'ml' })",
      "result": "number({ measure:'cellule/Kg' })",
      "notes": "text"
    },
    "unity_manipulation": {
      "date": "date({ auto:'now' })",
      "manipulations": "array({ type:'manipulation' })",
      "notes": "text"
    }
  }
},
  "enums": {
    "collection_types": [
      "HPC_M",
      "HPC_A",
      "TC_T",
      "CB"
    ],
    "collection_states": [
      "requested",
      "not_suitable",
      "suitable",
      "performed"
    ],
    "processing_states": [
      "accepted",
      "manipulated",
      "freezed",
      "stored",
      "unfreezed",
      "requested",
      "suitable",
      "released",
      "reinfused",
      "engrafted",
      "fractionated",
      "assemblata"
    ],
    "collection_facilities": [
      "Ospedale RaccogliAmo",
      "GetBlood s.p.a.",
      "OP Bambin Gesù",
      "Ospedale Annunziata CS",
      "CryoLab"
    ],
    "processing_facilities": [
      "ManipulBlood",
      "CryoBlood",
      "CryoLab",
      "Casaniella"
    ],
    "vascular_access": [
      "peripheral veins",
      "central_venous_catheter"
    ],
    "manipulations": [
      "filtration",
      "density_gradient",
      "buffy_coat_preparation",
      "plasma_removal",
      "erythrocytes_removal",
      "negative_selection",
      "positive_selection",
      "freezing",
      "unfreezing"
    ],
    "manipulations_HPC_M": [
      "filtration",
      "density_gradient",
      "buffy_coat_preparation",
      "plasma_removal",
      "erythrocytes_removal",
      "negative_selection",
      "positive_selection",
      "freezing"
    ],
    "manipulations_HPC_A": [
      "filtration",
      "density_gradient",
      "buffy_coat_preparation",
      "plasma_removal",
      "erythrocytes_removal",
      "negative_selection",
      "positive_selection",
      "freezing"
    ],
    "manipulations_TC_T": [
      "density_gradient",
      "buffy_coat_preparation",
      "freezing"
    ],
    "valutation": [
      "positive",
      "negative",
      "waiting"
    ],
    "group_compatibility": [
      "none",
      "greater",
      "minor",
      "bidirectional"
    ],
    "cryoprotector": [
      "DCM0",
      "PSp2"
    ],
    "anticoagulant": [
      "eparina",
      "pirivillina",
      "mesolina",
      "pischellina"
    ],
    "additive": [
      "saurina",
      "taurina",
      "caffeina",
      "saccarosio"
    ]
  },
  "repo_random": {
    "centri": {},
    "cristiani": {},
    "donatori": {},
    "pazienti": {},
    "raccolte": {},
    "unita": {}
  }
}