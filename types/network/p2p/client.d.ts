import SimplePeer from "simple-peer/simplepeer.min.js";
export declare function join({ toName, fromName, fromClientId, websocketHubUrl, onError, onData, onPeerDisconnected }: {
    toName: string;
    fromName: string;
    fromClientId: string;
    websocketHubUrl: string;
    onError: (error: any) => void;
    onData: (data: any) => void;
    onPeerDisconnected: (p: SimplePeer) => void;
}): Promise<{
    peer: SimplePeer;
    name: string;
}>;
