import React, {useContext, useState} from "react";
import {Button, Divider, List, Space} from "antd";
import {Context} from "../AppContext";
import Avatar from "antd/es/avatar/avatar";
import QRCodeModal from "web3-qrcode-modal";
import {Web3Wallets} from 'web3-wallets';

import {metamaskIcon, coinbaseIcon, walletConnectIcon} from "../js/config"

import {walletAction} from "../js/walletAction";

export function WalletList() {
    const {setWallet} = useContext(Context);

    const selectWallet = async (item, action) => {
        const newWallet = new Web3Wallets({name: item.key, qccodeModal: QRCodeModal})
        if (item.key == 'metamask') {
            const accounts = await newWallet.walletProvider.enable() // enable ethereum
            setWallet(newWallet)
        }
        if (item.key == "wallet_connect") {
            const provider = newWallet.walletProvider
            // debugger
            if (provider.connected) {
                setWallet(newWallet)
            } else {
                await provider.open()
            }
            provider.on('connect', async (error, payload) => {

                if (error) {
                    throw error
                }
                setWallet(newWallet)
            })
            provider.on('disconnect', async (error) => {
                debugger
                if (error) {
                    throw error
                }
                setWallet({})
            })
        }

        if (item.key == 'coinbase') {
            const accounts = await newWallet.walletProvider.enable() // enable ethereum
            setWallet(newWallet)
        }

        if (newWallet.chainId) {
            await walletAction(newWallet, action)
        }

    };


    const walletItems = [
        {title: 'MetaMask', key: 'metamask', icon: metamaskIcon, desc: "Popular wallet"},
        {title: 'WalletConnect', key: 'wallet_connect', icon: walletConnectIcon, desc: "mobile only"},
        {title: 'CoinBase', key: 'coinbase', icon: coinbaseIcon, desc: "coinbase wallet"}
    ];

    const accountFun = [
        {title: 'SignMessage', key: 'SignMessage', disabled: ['']},
        {title: 'SignTypedData', key: 'SignTypedData', disabled: ['']},
        {title: 'GetBalance', key: 'GetBalance', disabled: ['']}
    ];

    const contractFun = [
        {title: 'DepositWETH', key: 'wethDeposit', disabled: ['']},
        {title: 'WithdrawWETH', key: 'wethWithdraw', disabled: ['']},
    ]

    const walletFun = [
        {title: 'Lock', key: 'SendContract', disabled: ['wallet_connect']},
        {title: 'AddToken', key: 'SendContract', disabled: ['wallet_connect']},
        {title: 'SwitchChain', key: 'SendContract', disabled: ['wallet_connect']},
    ]

    const accountActions = (item) => accountFun.map(val => {
        return <Button disabled={val.disabled.some(key => key == item.key)} key={val.title}
                       onClick={() => selectWallet(item, val.key)}>{val.title}</Button>
    })

    const contractActions = (item) => contractFun.map(val => {
        return <Button disabled={val.disabled.some(key => key == item.key)} key={val.title}
                       onClick={() => selectWallet(item, val.key)}>{val.title}</Button>
    })

    const walletActions = (item) => walletFun.map(val => {
        return <Button disabled={val.disabled.some(key => key == item.key)} key={val.title}
                       onClick={() => selectWallet(item, val.key)}>{val.title}</Button>
    })

    return (
        <>
            <List
                style={{padding: '20px 60px'}}
                itemLayout="vertical"
                size="large"
                dataSource={walletItems}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.icon} shape={'square'} size={60}/>}
                            title={<a>{item.title}</a>}
                            description={item.desc}
                        />
                        {/*{"ddddd"}*/}
                        <Space>
                            Account Actions {accountActions(item)}
                        </Space>
                        <Divider style={{margin: 8}}/>
                        <Space>
                            Contract Actions {contractActions(item)}
                        </Space>
                        <Divider style={{margin: 8}}/>
                        <Space>
                            Wallet Actions {walletActions(item)}
                        </Space>


                        {/*{()=>actions(item)}*/}
                    </List.Item>
                )}
            />
        </>
    )
}
