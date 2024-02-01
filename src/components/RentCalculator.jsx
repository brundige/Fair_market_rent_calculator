import React, {useState} from "react";
import './utilityAllowance.js';
import styles from  './rentForm.styles.module.css'



function RentCalculator() {

    // HUD SAFMR data for Chattanooga, TN This is the data that will be used to calculate the voucher size
// it needs to be updated every year ** The data is typically available in OCT for the following year.
    const safmr = {
        "37302": {
            "area": "Apison",
            "studio": 1236,
            "oneBedroom": 1260,
            "twoBedroom": 1428,
            "threeBedroom": 1824,
            "fourBedroom": 2064,
            "fiveBedroom": 2374,
            "sixBedroom": 2683
        }, "37308": {
            "area": "Birchwood",
            "studio": 1284,
            "oneBedroom": 1320,
            "twoBedroom": 1560,
            "threeBedroom": 2004,
            "fourBedroom": 2232,
            "fiveBedroom": 2567,
            "sixBedroom": 2902
        }, "37311": {
            "area": "Hamilton cnty areas only",
            "studio": 936,
            "oneBedroom": 1008,
            "twoBedroom": 1320,
            "threeBedroom": 1728,
            "fourBedroom": 1812,
            "fiveBedroom": 2084,
            "sixBedroom": 2356
        }, "37315": {
            "area": "Collegedale",
            "studio": 1632,
            "oneBedroom": 1656,
            "twoBedroom": 1884,
            "threeBedroom": 2400,
            "fourBedroom": 2724,
            "fiveBedroom": 3133,
            "sixBedroom": 3541
        }, "37341": {
            "area": "Harrison",
            "studio": 1428,
            "oneBedroom": 1452,
            "twoBedroom": 1644,
            "threeBedroom": 2088,
            "fourBedroom": 2376,
            "fiveBedroom": 2732,
            "sixBedroom": 3089
        }, "37343": {
            "area": "Hixson",
            "studio": 1380,
            "oneBedroom": 1404,
            "twoBedroom": 1596,
            "threeBedroom": 2028,
            "fourBedroom": 2316,
            "fiveBedroom": 2663,
            "sixBedroom": 3011
        }, "37350": {
            "area": "Lookout Mtn",
            "studio": 1260,
            "oneBedroom": 1284,
            "twoBedroom": 1452,
            "threeBedroom": 1848,
            "fourBedroom": 2100,
            "fiveBedroom": 2415,
            "sixBedroom": 2730
        }, "37351": {
            "area": "Lupton City",
            "studio": 1368,
            "oneBedroom": 1392,
            "twoBedroom": 1608,
            "threeBedroom": 2052,
            "fourBedroom": 2436,
            "fiveBedroom": 2801,
            "sixBedroom": 3167
        }, "37353": {
            "area": "Hamilton cnty areas only",
            "studio": 1044,
            "oneBedroom": 1104,
            "twoBedroom": 1416,
            "threeBedroom": 1848,
            "fourBedroom": 1968,
            "fiveBedroom": 2263,
            "sixBedroom": 2558
        }, "37363": {
            "area": "Ooltewah",
            "studio": 1632,
            "oneBedroom": 1656,
            "twoBedroom": 1884,
            "threeBedroom": 2400,
            "fourBedroom": 2724,
            "fiveBedroom": 3133,
            "sixBedroom": 3541
        }, "37373": {
            "area": "Sale Creek",
            "studio": 1428,
            "oneBedroom": 1452,
            "twoBedroom": 1644,
            "threeBedroom": 2088,
            "fourBedroom": 2376,
            "fiveBedroom": 2732,
            "sixBedroom": 3089
        }, "37377": {
            "area": "Signal Mtn",
            "studio": 1632,
            "oneBedroom": 1656,
            "twoBedroom": 1884,
            "threeBedroom": 2400,
            "fourBedroom": 2724,
            "fiveBedroom": 3133,
            "sixBedroom": 3541
        }, "37379": {
            "area": "Soddy Daisy",
            "studio": 1176,
            "oneBedroom": 1200,
            "twoBedroom": 1356,
            "threeBedroom": 1728,
            "fourBedroom": 1968,
            "fiveBedroom": 2263,
            "sixBedroom": 2558
        }, "37384": {
            "area": "Soddy Daisy",
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }, "37401": {
            "area": "Downtown",
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }, "37402": {
            "area": "Downtown",
            "studio": 1212,
            "oneBedroom": 1224,
            "twoBedroom": 1392,
            "threeBedroom": 1776,
            "fourBedroom": 2016,
            "fiveBedroom": 2318,
            "sixBedroom": 2621
        }, "37403": {
            "area": "Downtown",
            "studio": 1476,
            "oneBedroom": 1500,
            "twoBedroom": 1704,
            "threeBedroom": 2172,
            "fourBedroom": 2472,
            "fiveBedroom": 2843,
            "sixBedroom": 3214
        }, "37404": {
            "area": "Highland Park",
            "studio": 1140,
            "oneBedroom": 1152,
            "twoBedroom": 1308,
            "threeBedroom": 1668,
            "fourBedroom": 1896,
            "fiveBedroom": 2180,
            "sixBedroom": 2465
        }, "37405": {
            "area": "N Chatt",
            "studio": 1524,
            "oneBedroom": 1548,
            "twoBedroom": 1764,
            "threeBedroom": 2244,
            "fourBedroom": 2556,
            "fiveBedroom": 2939,
            "sixBedroom": 3323
        }, "37406": {
            "area": "E Chatt",
            "studio": 1092,
            "oneBedroom": 1104,
            "twoBedroom": 1260,
            "threeBedroom": 1608,
            "fourBedroom": 1824,
            "fiveBedroom": 2098,
            "sixBedroom": 2371
        }, "37407": {
            "area": "E Lake",
            "studio": 1116,
            "oneBedroom": 1128,
            "twoBedroom": 1284,
            "threeBedroom": 1632,
            "fourBedroom": 1860,
            "fiveBedroom": 2139,
            "sixBedroom": 2418
        }, "37408": {
            "area": "Downtown",
            "studio": 1392,
            "oneBedroom": 1416,
            "twoBedroom": 1608,
            "threeBedroom": 2052,
            "fourBedroom": 2328,
            "fiveBedroom": 2677,
            "sixBedroom": 3026
        }, "37409": {
            "area": "St. Elmo",
            "studio": 1260,
            "oneBedroom": 1284,
            "twoBedroom": 1452,
            "threeBedroom": 1848,
            "fourBedroom": 2100,
            "fiveBedroom": 2415,
            "sixBedroom": 2730
        }, "37410": {
            "area": "Alton Park",
            "studio": 1044,
            "oneBedroom": 1056,
            "twoBedroom": 1200,
            "threeBedroom": 1524,
            "fourBedroom": 1740,
            "fiveBedroom": 2001,
            "sixBedroom": 2262
        }, "37411": {
            "area": "Brainerd",
            "studio": 1212,
            "oneBedroom": 1236,
            "twoBedroom": 1404,
            "threeBedroom": 1788,
            "fourBedroom": 2028,
            "fiveBedroom": 2332,
            "sixBedroom": 2636
        }, "37412": {
            "area": "E Ridge",
            "studio": 1296,
            "oneBedroom": 1308,
            "twoBedroom": 1488,
            "threeBedroom": 1896,
            "fourBedroom": 2160,
            "fiveBedroom": 2484,
            "sixBedroom": 2808
        }, "37414": {
            "area": "Brainerd",
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }, "37415": {
            "area": "Red Bank",
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }, "37416": {
            "area": "58/Oaks/Harrison",
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }, "37419": {
            "area": "Tifftonia",
            "studio": 1452,
            "oneBedroom": 1464,
            "twoBedroom": 1668,
            "threeBedroom": 2124,
            "fourBedroom": 2412,
            "fiveBedroom": 2774,
            "sixBedroom": 3136
        }, "37421": {
            "area": "E Brainerd",
            "studio": 1332,
            "oneBedroom": 1356,
            "twoBedroom": 1536,
            "threeBedroom": 1956,
            "fourBedroom": 2220,
            "fiveBedroom": 2553,
            "sixBedroom": 2886
        }, "37422": {
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }, "37424": {
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }, "37450": {
            "studio": 1356,
            "oneBedroom": 1380,
            "twoBedroom": 1560,
            "threeBedroom": 1992,
            "fourBedroom": 2256,
            "fiveBedroom": 2594,
            "sixBedroom": 2933
        }
    }
// UTILITY ALLOWANCE DATA FOR CHATTANOOGA, TN
    const UtilityAllowance = {
        "singleFamily": {
            "heating": {
                "naturalGas": {
                    "0": 16, "1": 19, "2": 21, "3": 24, "4": 27, "5": 29,
                }, "electric": {
                    "0": 27, "1": 32, "2": 37, "3": 42, "4": 47, "5": 52,
                }, "electricHeatPump": {
                    "0": 15, "1": 18, "2": 22, "3": 24, "4": 27, "5": 30,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 88, "1": 104, "2": 118, "3": 132, "4": 147, "5": 161,
                },

            }, "cooking": {
                "naturalGas": {
                    "0": 28, "1": 28, "2": 29, "3": 30, "4": 31, "5": 32,
                }, "electric": {
                    "0": 4, "1": 5, "2": 7, "3": 10, "4": 12, "5": 14,
                },

                "other": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 10, "1": 12, "2": 17, "3": 22, "4": 27, "5": 33,
                },
            }, "airConditioning": {
                "0": 6, "1": 7, "2": 15, "3": 24, "4": 32, "5": 41,
            }, "waterHeater": {
                "naturalGas": {
                    "0": 5, "1": 6, "2": 9, "3": 11, "4": 14, "5": 17,
                }, "electric": {
                    "0": 13, "1": 15, "2": 20, "3": 24, "4": 28, "5": 33,
                }, "bottledGas": {
                    "0": 28, "1": 33, "2": 48, "3": 62, "4": 77, "5": 92,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                },

            }, "water": {
                "0": 19, "1": 21, "2": 37, "3": 61, "4": 84, "5": 108,
            }, "sewer": {
                "0": 56, "1": 62, "2": 103, "3": 165, "4": 227, "5": 289,
            }, "trash": {
                "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10,
            }, "range": {
                "0": 17, "1": 17, "2": 17, "3": 17, "4": 17, "5": 17,
            }, "refrigerator": {
                "0": 21, "1": 21, "2": 21, "3": 21, "4": 21, "5": 21,
            }, "other": {
                "0": 32, "1": 35, "2": 45, "3": 54, "4": 63, "5": 72,
            },
        }, "duplex": {
            "heating": {
                "naturalGas": {
                    "0": 18, "1": 21, "2": 22, "3": 24, "4": 25, "5": 27,
                }, "electric": {
                    "0": 18, "1": 21, "2": 27, "3": 32, "4": 38, "5": 43,
                }, "electricHeatPump": {
                    "0": 14, "1": 16, "2": 19, "3": 22, "4": 24, "5": 27,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 98, "1": 115, "2": 123, "3": 131, "4": 139, "5": 147,
                },

            }, "cooking": {
                "naturalGas": {
                    "0": 28, "1": 28, "2": 29, "3": 30, "4": 31, "5": 32,
                }, "electric": {
                    "0": 10, "1": 12, "2": 17, "3": 22, "4": 27, "5": 33,
                },

                "other": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 10, "1": 12, "2": 17, "3": 22, "4": 27, "5": 33,
                },
            }, "airConditioning": {
                "0": 8, "1": 10, "2": 14, "3": 17, "4": 21, "5": 25,
            }, "waterHeater": {
                "naturalGas": {
                    "0": 5, "1": 6, "2": 9, "3": 11, "4": 14, "5": 17,
                }, "electric": {
                    "0": 13, "1": 15, "2": 20, "3": 24, "4": 28, "5": 33,
                }, "bottledGas": {
                    "0": 28, "1": 33, "2": 48, "3": 62, "4": 77, "5": 92,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                },

            }, "water": {
                "0": 19, "1": 21, "2": 37, "3": 61, "4": 84, "5": 108,
            }, "sewer": {
                "0": 56, "1": 62, "2": 103, "3": 165, "4": 227, "5": 289,
            }, "trash": {
                "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10,
            }, "range": {
                "0": 17, "1": 17, "2": 17, "3": 17, "4": 17, "5": 17,
            }, "refrigerator": {
                "0": 21, "1": 21, "2": 21, "3": 21, "4": 21, "5": 21,
            }, "other": {
                "0": 32, "1": 35, "2": 45, "3": 54, "4": 63, "5": 72,
            },

        }, "apartment": {
            "heating": {
                "naturalGas": {
                    "0": 11, "1": 13, "2": 15, "3": 17, "4": 19, "5": 21,
                }, "electric": {
                    "0": 12, "1": 15, "2": 19, "3": 23, "4": 28, "5": 32,
                }, "electricHeatPump": {
                    "0": 11, "1": 13, "2": 15, "3": 17, "4": 19, "5": 21,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 62, "1": 73, "2": 83, "3": 93, "4": 103, "5": 113,
                },
            }, "cooking": {
                "naturalGas": {
                    "0": 28, "1": 28, "2": 29, "3": 30, "4": 31, "5": 32,
                }, "electric": {
                    "0": 10, "1": 12, "2": 17, "3": 22, "4": 27, "5": 33,
                },

                "other": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 10, "1": 12, "2": 17, "3": 22, "4": 27, "5": 33,
                },
            }, "airConditioning": {
                "0": 7, "1": 9, "2": 12, "3": 16, "4": 19, "5": 22,
            }, "waterHeater": {
                "naturalGas": {
                    "0": 4, "1": 5, "2": 7, "3": 9, "4": 11, "5": 13,
                }, "electric": {
                    "0": 11, "1": 12, "2": 16, "3": 19, "4": 23, "5": 26,
                }, "bottledGas": {
                    "0": 22, "1": 26, "2": 38, "3": 50, "4": 62, "5": 73,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                },

            }, "water": {
                "0": 19, "1": 21, "2": 37, "3": 61, "4": 84, "5": 108,
            }, "sewer": {
                "0": 56, "1": 62, "2": 103, "3": 165, "4": 227, "5": 289,
            }, "trash": {
                "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10,
            }, "range": {
                "0": 17, "1": 17, "2": 17, "3": 17, "4": 17, "5": 17,
            }, "refrigerator": {
                "0": 21, "1": 21, "2": 21, "3": 21, "4": 21, "5": 21,
            }, "other": {
                "0": 32, "1": 35, "2": 45, "3": 54, "4": 63, "5": 72,
            },

        }, "apartmentEnergyStar": {
            "heating": {
                "naturalGas": {
                    "0": 9, "1": 11, "2": 12, "3": 14, "4": 15, "5": 17,
                }, "electric": {
                    "0": 10, "1": 12, "2": 16, "3": 19, "4": 23, "5": 26,
                }, "electricHeatPump": {
                    "0": 9, "1": 10, "2": 12, "3": 14, "4": 15, "5": 17,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 51, "1": 59, "2": 68, "3": 76, "4": 84, "5": 92,
                },

            }, "cooking": {
                "naturalGas": {
                    "0": 27, "1": 28, "2": 29, "3": 30, "4": 31, "5": 32,
                }, "electric": {
                    "0": 4, "1": 4, "2": 6, "3": 8, "4": 10, "5": 12,
                },

                "other": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 8, "1": 10, "2": 14, "3": 18, "4": 22, "5": 27,
                },
            }, "airConditioning": {
                "0": 6, "1": 7, "2": 10, "3": 13, "4": 16, "5": 18,
            }, "waterHeater": {
                "naturalGas": {
                    "0": 3, "1": 4, "2": 6, "3": 7, "4": 9, "5": 11,
                }, "electric": {
                    "0": 9, "1": 10, "2": 13, "3": 16, "4": 19, "5": 21,
                }, "bottledGas": {
                    "0": 18, "1": 22, "2": 31, "3": 41, "4": 51, "5": 60,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                },

            }, "water": {
                "0": 19, "1": 21, "2": 37, "3": 61, "4": 84, "5": 108,
            }, "sewer": {
                "0": 56, "1": 62, "2": 103, "3": 165, "4": 227, "5": 289,
            }, "trash": {
                "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10,
            }, "range": {
                "0": 17, "1": 17, "2": 17, "3": 17, "4": 17, "5": 17,
            }, "refrigerator": {
                "0": 21, "1": 21, "2": 21, "3": 21, "4": 21, "5": 21,
            }, "other": {
                "0": 25, "1": 28, "2": 34, "3": 40, "4": 46, "5": 52,
            },

        }, "mobileHome": {
            "heating": {
                "naturalGas": {
                    "0": 14, "1": 16, "2": 18, "3": 20, "4": 23, "5": 25,
                }, "electric": {
                    "0": 29, "1": 34, "2": 35, "3": 36, "4": 37, "5": 38,
                }, "electricHeatPump": {
                    "0": 13, "1": 15, "2": 18, "3": 21, "4": 23, "5": 25,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 75, "1": 88, "2": 100, "3": 112, "4": 125, "5": 137,
                },

            }, "cooking": {
                "naturalGas": {
                    "0": 28, "1": 28, "2": 29, "3": 30, "4": 31, "5": 32,
                }, "electric": {
                    "0": 10, "1": 12, "2": 17, "3": 22, "4": 27, "5": 33,
                },

                "other": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                }, "bottledGas": {
                    "0": 10, "1": 12, "2": 17, "3": 22, "4": 27, "5": 33,
                },
            }, "airConditioning": {
                "0": 7, "1": 8, "2": 14, "3": 20, "4": 26, "5": 32,
            }, "waterHeater": {
                "naturalGas": {
                    "0": 5, "1": 6, "2": 9, "3": 11, "4": 14, "5": 17,
                }, "electric": {
                    "0": 13, "1": 15, "2": 20, "3": 24, "4": 28, "5": 33,
                }, "bottledGas": {
                    "0": 28, "1": 33, "2": 48, "3": 62, "4": 77, "5": 92,
                }, "fuelOil": {
                    "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
                },

            }, "water": {
                "0": 19, "1": 21, "2": 37, "3": 61, "4": 84, "5": 108,
            }, "sewer": {
                "0": 56, "1": 62, "2": 103, "3": 165, "4": 227, "5": 289,
            }, "trash": {
                "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10,
            }, "range": {
                "0": 17, "1": 17, "2": 17, "3": 17, "4": 17, "5": 17,
            }, "refrigerator": {
                "0": 21, "1": 21, "2": 21, "3": 21, "4": 21, "5": 21,
            }, "other": {
                "0": 36, "1": 40, "2": 51, "3": 63, "4": 74, "5": 85,
            },

        },


    }



    const [zipCode, setZipCode] = useState("");
    const [income, setIncome] = useState();
    let [voucherSize, setVoucherSize] = useState(0);
    const [utilitiesIncluded, setUtilitiesIncluded] = useState(false);
    const [heatingFuel, setHeatingFuel] = useState("naturalGas");
    const [cookingFuel, setCookingFuel] = useState("naturalGas");
    const [waterHeatingFuel, setWaterHeatingFuel] = useState("naturalGas");
    const [buildingType, setBuildingType] = useState("apartment");
    const [bedrooms, setBedrooms] = useState("studio");
    const [affordableRent, setAffordableRent] = useState('Fill out form to calculate rent');


    function calculateUtilityAllowance() {

        let roomNum;

        //map bedrooms to number
        switch (bedrooms) {
            case "studio":
                roomNum = '0';
                break;
            case "oneBedroom":
                roomNum = '1';
                break;
            case "twoBedroom":
                roomNum = '2';
                break;
            case "threeBedroom":
                roomNum = '3';
                break;
            case "fourBedroom":
                roomNum = '4';
                break;
            case "fiveBedroom":
                roomNum = '5';
                break;
            case "sixBedroom":
                roomNum = '6';
                break;
            default:
                roomNum = '0';
        }

        let heating = UtilityAllowance[buildingType]["heating"][heatingFuel][roomNum];
        let cooking = UtilityAllowance[buildingType]["cooking"][cookingFuel][roomNum];
        let waterHeating = UtilityAllowance[buildingType]["waterHeater"][waterHeatingFuel][roomNum];
        let airConditioning = UtilityAllowance[buildingType]["airConditioning"][roomNum];
        let water = UtilityAllowance[buildingType]["water"][roomNum];
        let sewer = UtilityAllowance[buildingType]["sewer"][roomNum];
        let trash = UtilityAllowance[buildingType]["trash"][roomNum];
        let range = UtilityAllowance[buildingType]["range"][roomNum];
        let refrigerator = UtilityAllowance[buildingType]["refrigerator"][roomNum];
        let other = UtilityAllowance[buildingType]["other"][roomNum];


        return heating + cooking + waterHeating + airConditioning + water + sewer + trash + range + refrigerator + other;


    }

    const calcAffordableRent = () => {



        // get voucher size

        setVoucherSize(safmr[zipCode][bedrooms]);

        let utilities = utilitiesIncluded ? 0 : calculateUtilityAllowance();

        let affordableRent = voucherSize + (income * 0.1) - utilities;

        setAffordableRent(<div>
            <p>SAFMR: ${voucherSize}</p>
            <p>Adjusted Income: ${income}</p>
            <p>Utilities: ${utilities}</p>
            <p>Affordable Rent: ${affordableRent}</p>
        </div>);


    }


    const handleSubmit = (event) => {


        event.preventDefault();
        // handle form validation
        if (zipCode === "" || income === "" || buildingType === "" || bedrooms === "") {
            alert("Please fill out all fields");
            return;
        }
        calcAffordableRent()
    }


    return (
        <div className={styles.wrapper}>

            <div className={styles.left}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Rent Calculator</h1>
                <label>Zip Code</label>
                <input type="text" name="zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                       placeholder="Zip Code"/>
                <label>Income</label>
                <input type="text" name="income" value={income} onChange={(e) => setIncome(e.target.value)}
                       placeholder="Income"/>
                <label>Unit Type</label>
                <select name="unitType" value={buildingType} onChange={(e) => setBuildingType(e.target.value)}>
                    <option value="apartment">Apartment</option>
                    <option value="apartmentEnergyStar">Apartment -- Energy Star Certified</option>
                    <option value="singleFamily">Single Family</option>
                    <option value="mobileHome">Manufactured/Mobile</option>
                    <option value="duplex">Duplex</option>
                </select>
                <label>Bedrooms</label>
                <select name="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                    <option value="studio">Studio</option>
                    <option value="oneBedroom">1</option>
                    <option value="twoBedroom">2</option>
                    <option value="threeBedroom">3</option>
                    <option value="fourBedroom">4</option>
                    <option value="fiveBedroom">5</option>
                    <option value="sixBedroom">6</option>
                </select>

                <label>Utilities Included</label>

                <div className="util">


                    <div className={styles.radio}>


                    <input
                        type="radio"
                        name="utilitiesIncluded"
                        value="yes"
                        checked={utilitiesIncluded}
                        defaultChecked={true}
                        onChange={() => setUtilitiesIncluded(true)}
                    /> <span>Yes</span>

                    <input
                        type="radio"
                        name="utilitiesIncluded"
                        value="no"
                        checked={!utilitiesIncluded}
                        onChange={() => setUtilitiesIncluded(false)}
                    /> <span>No</span>

                    </div>


                {utilitiesIncluded ? (<div>

                </div>) : (<div>
                    <label>Heating Fuel</label>
                    <select name="heating-fuel" value={heatingFuel}
                            onChange={(e) => setHeatingFuel(e.target.value)}>
                        <option value="naturalGas">natural gas</option>
                        <option value="bottledGas">bottled gas</option>
                        <option value="electric">electric</option>
                        <option value="electricHeatPump">electric heat pump</option>
                        <option value="fuelOil">Fuel oil</option>

                    </select>

                    <label>Cooking Fuel</label>
                    <select name="cooking-fuel" value={cookingFuel}
                            onChange={(e) => setCookingFuel(e.target.value)}>
                        <option value="naturalGas">natural gas</option>
                        <option value="bottledGas">bottled gas</option>
                        <option value="electric">electric</option>
                        <option value="electricHeatPump">electric heat pump</option>
                        <option value="fuelOil">Fuel oil</option>

                    </select>
                    <label>Water Heating</label>
                    <select name="water-heating" value={waterHeatingFuel}
                            onChange={(e) => setWaterHeatingFuel(e.target.value)}>
                        <option value="naturalGas">natural gas</option>
                        <option value="bottledGas">bottled gas</option>
                        <option value="electric">electric</option>
                        <option value="fuelOil">Fuel oil</option>

                    </select>

                </div>)}

                </div>

                <input type="submit" value="Submit"/>


            </form>

            </div>

            <div className={styles.right}>
            <div className={styles.txtArea}>
                <h2>
                    Results
                </h2>
                <span>{affordableRent}</span>











            </div>
            </div>

        </div>);
}

export default RentCalculator;
