import React, { useState, useEffect } from 'react';
import history from '../../utils/history';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {SettingsH2, SettingsBox, StripeH3, StripeStatusTitle, StripeStatus, SettingsContainer, StorefrontH3,
         AccountTitle, AccountNumber, Divider, StorefrontStatusTitle, StorefrontStatusConainer,
        StorefrontStatusDot, StorefrontStatus, StorefrontTitle, StorefrontName, StripeContainer,
        StripeStatusContainer, StripeButton, AccountContainer, StorefrontContainer, StorefrontStatusInner, StorefrontNameContainer } from './Styled';



const Settings = () => {
  const [stripe, setStripe] = useState("");
  const [store, setStore] = useState("");

    const [stripe,setStripe] = useState('');
    const [connected, setConnected] = useState(false)
    const [store,setStore] = useState('');

    useEffect(() => {
        async function getInfo() {
      
            let profile = JSON.parse(localStorage.getItem("profile"));
            // let profile = {
                // email: 'jthanson238@gmail.com'}; //for Testing on local seeded db
            

            
            axiosWithAuth()
            .get(`/api/stripe/${profile.email}`)
            .then((res) => {
                console.log(res.data.user.stripe_account)
                if(res.data.user.stripe_account){setStripe(res.data.user.stripe_account);}
                if(stripe){setConnected(true)}
                });
          
            const res = await axiosWithAuth().get(
                `/api/users/email/${profile.email}`
            );

    axiosWithAuth()
      .get(`/api/stripe/${profile.email}`)
      .then((res) => {
        console.log(res.data.user.stripe_account);
        if (res.data.user.stripe_account) {
          setStripe(res.data.user.stripe_account);
        }
      });

    axiosWithAuth()
      .get(`/api/users/email/${profile.email}`)
      .then((res) => {
        const userID = res.data.id;
        axiosWithAuth()
          .get(`/api/stores/user/${userID}`)
          .then((res2) => {
            setStore(res2.data.store_name);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return (
        <SettingsContainer>
            <SettingsH2>Settings</SettingsH2>
            <SettingsBox>
                <StripeContainer>
                    <StripeH3>Stripe</StripeH3>
                    <StripeStatusContainer>
                        <StripeStatusTitle>Status:</StripeStatusTitle>
                        {connected ? <StripeStatus>Connected</StripeStatus>
                        : <StripeButton>Connect to Stripe</StripeButton>}
                        
                    </StripeStatusContainer>
                  

                    <AccountContainer>
                        <AccountTitle>Account Number:</AccountTitle>
                        {connected ? <AccountNumber>{stripe}</AccountNumber>
                        : <AccountNumber>No Account</AccountNumber>}
                        
                    </AccountContainer>

                    
                </StripeContainer>

        <Divider />

        <StorefrontContainer>
          <StorefrontH3>Storefront</StorefrontH3>
          <StorefrontStatusConainer>
            <StorefrontStatusTitle>Status:</StorefrontStatusTitle>
            <StorefrontStatusInner>
              <StorefrontStatusDot />
              <StorefrontStatus>Online</StorefrontStatus>
            </StorefrontStatusInner>
          </StorefrontStatusConainer>
          <StorefrontNameContainer>
            <StorefrontTitle>Store Name:</StorefrontTitle>
            <StorefrontName>{store}</StorefrontName>
          </StorefrontNameContainer>
        </StorefrontContainer>
      </SettingsBox>
    </SettingsContainer>
  );
};

export default Settings;
