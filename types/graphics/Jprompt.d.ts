import { Localizable } from "../localization";
export interface PromptArgs {
    text: Localizable;
    gore?: boolean;
    noBtnText?: string;
    noBtnKey?: string;
    yesText: string;
    yesKey?: string;
    yesKeyText?: string;
    imageSrc?: string;
    portal?: HTMLElement;
    forceShow?: boolean;
}
export default function Jprompt(prompt: PromptArgs): Promise<boolean>;
