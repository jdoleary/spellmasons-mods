export declare function processNextInQueue<T>(container: MessageQueueContainer<T>, callback: (x: any) => Promise<void>): void;
export declare function makeContainer<T>(): MessageQueueContainer<T>;
export interface MessageQueueContainer<T> {
    queue: T[];
    _isProcessing: boolean;
}
