# Getting Started with Trading Stocks.

## Project Definition:

The task is to create a stock trading platform where users can buy and sell stocks. The system should support two types of users. One is the customer of the stock trading platform the other is an administrator of the system. In this project the administrator will be responsible for creating the stocks and setting the initial price. 

## User Requirements:

-	Create a user account with full name, username, and email.
-	Can buy and sell stocks at market price.
-	Can buy and sell stocks using limit order. 
    o	The user will set a desired price to buy or sell the stock and a date when to expire the limit order if it is not fulfilled. The user should also have the          option to cancel this order before it gets executed.
-	View their current portfolio of stocks and cash.
-	View their history of transactions. 
-	Ability to deposit and withdraw cash.
    o	The user when depositing cash will have the funds go into a cash account.
    o	The user should only be able to withdraw money from their cash account.
    o	When stocks are sold the funds will go to cash account.

## Administrators Requirements:
-	Create new stocks.
    o	Include Company name, stock ticker, volume, and initial price. 
    o	Volume will be total amount of shares purchased.
-	Change market hours. 
    o	Users should only be able to execute trades during market hours.
-	Change market schedule
    o	Market should only be open during weekdays and closed on holidays. 

## User interface Requirements:
-	Display available stocks that can be traded.
    o	Show stock ticker, price, volume, and market capitalization (volume X price)
    o	Show opening price for the stock
    o	Show high and low during the day
-	Perform the user and administrator functions as listed in the requirements from the UI.

## Random Stock Price Generator:
-	Allow the stock prices to fluctuate during the day with a custom random price generator. The price should gradually go up or down throughout the day.


# Frontend Installation:

1.	Clone the UI system into a directory on your system using the below Github link.
2.	via SSH: > git clone git@github.com:jashmin3998/Stock_Trading_UI.git 
3.	via HTTPS: > git clone https://github.com/jashmin3998/Stock_Trading_UI.git
4.	change BaseApiURL in axios.js to communicate with backend.
5.	Install npm and Internet Information System(IIS) into your system.
6.	Run 'npm run build' command. It creates the build directory in the project folder.
7.	Open the IIS dashboard and upload the build folder there.
8.	Ready to hit the system URL by appending /stock-trading/.

# Architecture:
![image](https://user-images.githubusercontent.com/90228721/161123236-97580645-5cf0-4aef-86da-c9d4d313b8ad.png)


