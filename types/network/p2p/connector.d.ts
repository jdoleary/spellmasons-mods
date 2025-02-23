export declare function sendToHub(socket: WebSocket, data: any): void;
export declare function ensureConnectionToHub(wsHubUrl: string, handlers: {
    onData: (data: any, socket: WebSocket) => void;
    onError: (data: any, socket: WebSocket) => void;
    onConnectionState?: (open: boolean) => void;
}): Promise<WebSocket>;
