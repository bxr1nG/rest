import type PlayersObject from "~/types/PlayersObject";
import RequestBuilder from "~/utils/RequestBuilder";

const request = RequestBuilder("/api");

const api = {
    players: {
        get: request.get<PlayersObject>("/player")
    }
};

export default api;
