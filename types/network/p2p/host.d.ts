import SimplePeer from "simple-peer/simplepeer.min.js";
export declare function host({ fromName, websocketHubUrl, onPeerConnected, onPeerDisconnected, onError, onData, onConnectionState }: {
    fromName: string;
    websocketHubUrl: string;
    onPeerConnected: (p: SimplePeer, name: string, clientId: string) => void;
    onPeerDisconnected: (p: SimplePeer) => void;
    onError: (error: any) => void;
    onData: (data: any) => void;
    onConnectionState: (connected: boolean) => void;
}): Promise<void>;
