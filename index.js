const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const chatBase = require("./chatbase");

let app = express();

app.get("/", (req, res) => {
    res.send("online");
  });

app.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
  
    let intentMap = new Map();

    let welcome = () => {
        let botResponse = "Hi... this is from welcome fulfillment";
        chatBase(agent, botResponse, true);
        agent.add(botResponse);
    }

    let fallback = () => {
        let botResponse = "Sorry... this is from fallback fulfillment";
        chatBase(agent, botResponse, false);
        agent.add(botResponse);
    }

    let bookFlights = () => {
        let botResponse = `Done! I've booked your tickets for ${agent.parameters.date}, flying from ${agent.parameters.geo_city} to ${agent.parameters.geo_city1}(ff)`;
        chatBase(agent, botResponse, true);
        agent.add(botResponse);
    }

    let bookCars = () => {
        let botResponse = `I've booked ${agent.parameters.car_type} in ${agent.parameters.geo_city} for ${agent.parameters.date} for you (ff)`;
        chatBase(agent, botResponse, true);
        agent.add(botResponse);
    }

    let bookRooms = () => {
        let botResponse = `Done! I've booked your room in ${agent.parameters.geo_city} for ${agent.parameters.date} (ff)`;
        chatBase(agent, botResponse, true);
        agent.add(botResponse);
    }

    let bookFlightsCar = () => {
        let botResponse = `I've booked your car in ${agent.parameters.geo_city} for ${agent.parameters.date}`;
        chatBase(agent, botResponse, true);
        agent.add(botResponse);
    }

    let bookFlightsRoom = () => {
        let botResponse = `Reserved a room in ${agent.parameters.geo_city} on ${agent.parameters.date}`;
        chatBase(agent, botResponse, true);
        agent.add(botResponse);
    }

    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("BookFlights", bookFlights);
    intentMap.set("BookCars", bookCars);
    intentMap.set("BookRooms", bookRooms);
    intentMap.set("BookFlights - followupBookCars", bookFlightsCar);
    intentMap.set("BookFlights - followupBookRooms", bookFlightsRoom);

    agent.handleRequest(intentMap);
});

let server = app.listen(8080, () => {
    console.log("Connected");
});

module.exports = { app, server };

