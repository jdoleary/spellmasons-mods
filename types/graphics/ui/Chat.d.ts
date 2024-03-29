import * as Player from '../../entity/Player';
import { Overworld } from '../../Overworld';
export declare const elChatbox: HTMLElement | null;
export declare const elChatinput: HTMLInputElement;
export declare const elChatInner: HTMLElement | null;
export declare const elChatMessages: HTMLElement | null;
export declare function sendChatHandler(overworld: Overworld, e: KeyboardEvent): void;
export declare function ReceiveMessage(chatter: Player.IPlayer | undefined, message: string): void;
export declare function focusChat(event: Event | undefined): void;
