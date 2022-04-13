
import dotenv from 'dotenv';
import inquirer from 'inquirer';
import { weatherApi } from './weather.js';
import { movieApi } from './movie.js';
import fs from "fs";

let checkRandom = false;

inquirer
    .prompt([
        {
            name: "social",
            message: "Where do you want to search?",
            type: "list",
            choices: ['weather', 'movie', "random"]
        },
        {
            name: "search",
            message: "Write a word, you want to search",
            type: "input",
            when: (result => result.social !== "random")
        }

    ]).then((result) => {
        const chooseApi = result.social.toUpperCase();
        const searchWord = result.search?.toLowerCase();

        var getData = {};
        if (chooseApi === "WEATHER") {
            checkRandom = false;
            getData = weatherApi(searchWord, chooseApi.toLowerCase());
        }

        else if (chooseApi === "MOVIE") {
            checkRandom = false;
            getData = movieApi(searchWord, chooseApi.toLowerCase());
        }

        else {
            checkRandom = true;

            // READ RANDOM API 
            fs.readFile('./random.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }

                // GET VALUE FROM RESULT
                const splitStr = (data.trim().split('\n'));
                const commandApi = splitStr[0].trim().split(',');
                const commandWord = splitStr[1].trim().split(',');
                const randomWord = Math.floor(Math.random() * (commandWord.length));
                const randomApi = Math.floor(Math.random() * (commandApi.length));



                if (commandApi[randomApi].trim() == "WEATHER") {
                    weatherApi(commandWord[randomWord], commandApi[randomApi].toLowerCase()).then(res => {
                        console.log(res);
                        return fs.appendFile('./searchLogs.txt', "get: " + chooseApi + '\r\n' + "search: " + commandWord[randomWord] + '\r\n' + JSON.stringify(res) + '\r\n', err => {
                            if (err) {
                                console.log(err)
                                return
                            }
                        })
                    });
                }

                else if (commandApi[randomApi].trim() == "MOVIE") {
                    movieApi(commandWord[randomWord], commandApi[randomApi].toLowerCase()).then(res => {
                        console.log(res);
                        return fs.appendFile('./searchLogs.txt', "get: " + chooseApi + '\r\n' + "search: " + commandWord[randomWord] + '\r\n' + JSON.stringify(res) + '\r\n', err => {
                            if (err) {
                                console.log("error var", err)
                                return
                            }
                        })
                    });
                }
            })
        }

        if (!checkRandom) {
            getData.then(res => {
                console.log(res);
                return fs.appendFile('./searchLogs.txt', "get: " + chooseApi + '\r\n' + "search: " + searchWord + '\r\n' + JSON.stringify(res) + '\r\n', err => {
                    if (err) {
                        console.error("Not Found!!")
                        return
                    }
                })
            });
        }
    })
