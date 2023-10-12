export const menuObject = [
    {
        "header": "Assign",
        "hasChildren": true,
        "children": [
            {
                "header": "Client to staff",
                "hasChildren": false,
                "enableClick": true,
                "childEventTrigger": "MyWork.onAssignStafftoClient",
                "isActive": false
            },
            {
                "header": "Team assignment",
                "hasChildren": false,
                "enableClick": true,
                "childEventTrigger": "MyWork.onTeamAssignmentClick",
                "isActive": false
            }
            // ,
            // {
            //     "header": "Staff to roles",
            //     "hasChildren": false,
            //     "enableClick": false,
            //     "childEventTrigger": "",
            //     "isActive": false
            // }
        ]
    },
    // {
    //     "header": "Solution Masters",
    //     "hasChildren": true,
    //     "children": [
    //         {
    //             "header": "Services",
    //             "hasChildren": false,
    //             "enableClick": false,
    //             "childEventTrigger": "",
    //             "isActive": false
    //         },
    //         {
    //             "header": "Recipes",
    //             "hasChildren": false,
    //             "enableClick": false,
    //             "childEventTrigger": "",
    //             "isActive": false
    //         },
    //         {
    //             "header": "Diet Protocols",
    //             "hasChildren": false,
    //             "enableClick": false,
    //             "childEventTrigger": "",
    //             "isActive": false
    //         },
    //         {
    //             "header": "Nutrition Protocols",
    //             "hasChildren": false,
    //             "enableClick": false,
    //             "childEventTrigger": "",
    //             "isActive": false
    //         },
    //         {
    //             "header": "Products",
    //             "hasChildren": false,
    //             "enableClick": false,
    //             "childEventTrigger": "",
    //             "isActive": false
    //         }
    //     ]
    // }
    // ,
    // {
    //     "header": "Admin Masters",
    //     "hasChildren": true,
    //     "children": [
    //         {
    //             "header": "Roles & Hierarchies",
    //             "hasChildren": true,
    //             "enableClick": false,
    //             "childEventTrigger": "",
    //             "isActive": false,
    //             "children": [
    //                 {
    //                     "header": "Roles",
    //                     "hasChildren": false,
    //                     "enableClick": true,
    //                     "childEventTrigger": "MyWork.onAdminRoleView",
    //                     "isActive": false
    //                 },
    //                 // {
    //                 //     "header": "Hierarchies",
    //                 //     "hasChildren": false,
    //                 //     "enableClick": false,
    //                 //     "childEventTrigger": "",
    //                 //     "isActive": false
    //                 // }
    //             ]
    //         }
    //     ]
    // },
    {
        "header": "Data Masters",
        "hasChildren": true,
        "children": [
            {
                "header": "Conditions & Specialities",
                "hasChildren": true,
                "enableClick": false,
                "childEventTrigger": "",
                "isActive": false,
                "children": [
                    {
                        "header": "Conditions",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminConditionView",
                        "isActive": false
                    }
                    // ,
                    // {
                    //     "header": "Specialties",
                    //     "hasChildren": false,
                    //     "enableClick": true,
                    //     "childEventTrigger": "MyWork.onAdminSpecalitiesView",
                    //     "isActive": false
                    // }
                ]
            },
            {
                "header": "Investigations & Biomarkers",
                "hasChildren": true,
                "enableClick": false,
                "childEventTrigger": "",
                "isActive": false,
                "children": [
                    {
                        "header": "Biomarkers",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminBiomarkerView",
                        "isActive": false
                    },
                    {
                        "header": "Biomarker group",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminBiomarkerGroupView",
                        "isActive": false
                    },
                    {
                        "header": "Investigation types",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminInvestigationTypeView",
                        "isActive": false
                    }
                ]
            },
            {
                "header": "Nutrients",
                "hasChildren": true,
                "enableClick": false,
                "childEventTrigger": "",
                "isActive": false,
                "children": [
                    {
                        "header": "Nutrients",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminNutrientView",
                        "isActive": false
                    },
                    {
                        "header": "Nutrient group",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminNutrientGroupView",
                        "isActive": false
                    },
                    {
                        "header": "Ingredients",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onIngredientView",
                        "isActive": false
                    }
                ]
            },
            // {
            //     "header": "Units",
            //     "hasChildren": false,
            //     "enableClick": false,
            //     "childEventTrigger": "",
            //     "isActive": false
            // },
            {
                "header": "Geography",
                "hasChildren": true,
                "enableClick": false,
                "childEventTrigger": "",
                "isActive": false,
                "children": [
                    {
                        "header": "Countries",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminCountryView",
                        "isActive": false
                    },
                    {
                        "header": "Currencies",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminCurrenciesView",
                        "isActive": false
                    },
                    {
                        "header": "Languages",
                        "hasChildren": false,
                        "enableClick": true,
                        "childEventTrigger": "MyWork.onAdminLanguageView",
                        "isActive": false
                    }
                ]
            }
        ]
    }
]