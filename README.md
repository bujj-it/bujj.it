# bujj.it

A simple to use budgeting app. 

## Requirements Specification

### 1. Intro 

Budgeting app which is as simple to use as possible and which shows users how to keep track of their finances and save a percentage of their monthly income. 

App must be easy and simple to use, requiring as few clicks, decisions and inputs as possible. 

Scope to add tips/suggestions for improvements & social/game-ified content once MVP is achieved to high standard. 

**MVP:**

1. Landing page with pitch (simple infographic) and Call to Action (sign up/get started) 
2. User sign up
3. User can input income
4. User can input expenses
5. User can choose from several savings rate options, each with associated weekly spend amounts:

   ``` 10% savings rate = £X Weekly Spend | 15% = £Y Weekly Spend | 20% = £Z Weekly Spend  ```

### 1.1 Purpose

To provide an extremely simple framework to help users create a budget so they can control their finances and save towards their goals. 

### 1.2 Audience

Users who are inexperienced, lack experience/education in personal financial matters. Specifically younger people: teens, students, early 20s, etc.


### 1.3 Tech Stack

| **Function**         | **Tech**              |
|----------------------|-------------------|
| **Database Dev**     | PostgresSQL Local |
| **Database Prod**    | PostgresSQL AWS   |
| **Server framework** | Express.js        |
| **Server engine**    | NodeJS            |
| **Client framework** | React SPA         |
| **App format**       | Docker container  |
| **App host**         | AWS Kubernetes    |
| **CI/CD**            | TravisCI          |

### 2. Features & Requirements