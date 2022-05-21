import {TypedDataDomain, TypedDataField} from "@ethersproject/abstract-signer";

export type {TypedDataDomain, TypedDataField}

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NULL_BLOCK_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'
export const ETH_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"//0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
export const MAX_UINT_256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935' //new BigNumber(2).pow(256).minus(1).toString()


export enum ProviderNames {
    Metamask = 'MetaMask',
    Coinbase = 'Coinbase',
    ImToken = 'ImToken',
    MathWallet = 'MathWallet',
    TokenPocket = 'TokenPocket',
    WalletConnect = 'WalletConnect',
    ProxyWallet = 'ProxyWallet',
    KeyStroeWallet = 'KeyStroe'
}

export interface WalletInfo {
    chainId: number
    address: string
    priKey?: string
    rpcUrl?: string
    offsetGasLimitRatio?: number
    isSetGasPrice?: boolean
}


export interface LimitedCallSpec {
    to: string
    data: string
    value?: string
    from?: string
}

export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

export interface ProviderMessage {
    type: string;
    data: unknown;
}

interface EthSubscription extends ProviderMessage {
    readonly type: 'eth_subscription';
    readonly data: {
        readonly subscription: string;
        readonly result: unknown;
    };
}

export interface ProviderInfo {
    chainId: string;
}

export interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

export type ProviderChainId = string;

export interface ProviderConnectInfo {
    readonly chainId: string
}

export type ProviderAccounts = string[];

export interface EIP1102Request extends RequestArguments {
    method: "eth_requestAccounts";
}

export interface SimpleEventEmitter {
    // add listener
    on(event: string, listener: any): void;

    // add one-time listener
    once(event: string, listener: any): void;

    // remove listener
    removeListener(event: string, listener: any): void;

    // removeListener alias
    off(event: string, listener: any): void;
}

export interface EIP1193Provider extends SimpleEventEmitter {
    // connection event
    on(event: "connect", listener: (info: ProviderInfo) => void): void;

    // disconnection event
    on(event: "disconnect", listener: (error: ProviderRpcError) => void): void;

    // arbitrary messages
    on(event: "message", listener: (message: ProviderMessage) => void): void;

    // chain changed event
    on(event: "chainChanged", listener: (chainId: ProviderChainId) => void): void;

    // accounts changed event
    on(
        event: "accountsChanged",
        listener: (accounts: ProviderAccounts) => void
    ): void;

    // make an Ethereum RPC method call.
    request(args: RequestArguments): Promise<unknown>;
}

export interface IEthereumProvider extends EIP1193Provider {
    // legacy alias for EIP-1102
    enable(): Promise<ProviderAccounts>;
}


export interface EIP712Types {
    [key: string]: TypedDataField[];
}

export type EIP712ObjectValue = string | number | never[] | EIP712Object;

export interface EIP712Object {
    [key: string]: EIP712ObjectValue;
}

export interface EIP712TypedData {
    types: EIP712Types
    domain: TypedDataDomain
    message: EIP712Object
    primaryType: string
}

export interface ChainConfigType {
    rpcs: string []
    faucets?: string []
    scans?: string []
    name?: string
    websiteUrl?: string
    websiteDead?: boolean
    rpcWorking?: boolean
}
