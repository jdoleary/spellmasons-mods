export declare function host({ fromName, websocketHubUrl, onError, onData, onConnectionState }: {
    fromName: string;
    websocketHubUrl: string;
    onError: (error: any) => void;
    onData: (data: any) => void;
    onConnectionState: (connected: boolean) => void;
}): Promise<void>;
