# AWS serverless typescript demo - Backslash Frontend assigment 

### React app representing the code flow of [AWS serverless typescrip Demo](https://github.com/aws-samples/serverless-typescript-demo) Api metods.
<p>
Aws demo app consists of an Amazon API Gateway backed by four AWS Lambda functions and an Amazon DynamoDB table for storage.
<p/>
&nbsp;
<img width="1726" alt="Screen Shot 2022-08-02 at 11 09 21" src="https://user-images.githubusercontent.com/62664469/182366970-68fad222-0065-4841-9a81-91d6aabf655a.png">

&nbsp;
&nbsp;

<h2> App data :package: </h2>
<p>
Manually created csv files, one for nodes and another for the relations between them.
</p>
<p><pre>
Reading csv files didn't work due to  `versions` incompatibility.
Instead, defeining const representing the csv string for each file, reading and parsing it.
</pre>
</p>

> The data consts are inside the app.consts file
> 
&nbsp;

<h3>Node Data</h3>
<p>
Rows of data, seperated by '\n'.
</p>

- First row contains the headers 
  - Id : string
  - Label : string
  - Type : 'input' (API node) | 'output' (dynamoDB node) | 'default' (lmbda node)

<h3>Relations</h3>
<p>
The relations data, has a diffrent structure, in order to present diffrent flows in the app.
Groups of Data, each one contains flow id, and pairs of node id's seperated by a comma.

```
flowId + '\n' + sourceId,targetId' + '\n' ....
```
Groups are seperated with a space after '\n';

For example:

```
flow 1\n1,2\n2,6\n flow 2
```
  
&nbsp;
&nbsp;

## Local Setup :rocket:
1. Install [Node.js](https://nodejs.org/en/).  
2. Clone the repo from Github.
  
```
git clone https://github.com/mayareu/backslash-home-assigment.git
```
  
3. Navigate to the root directory and install dependencies through npm.
  
```
cd backslash
npm install
```
  
4. Run ` npm start `
  
&nbsp;
&nbsp;

## Technologies :dna:
- [React](https://reactjs.org/) v18.0.14 
- [Typescript](https://www.typescriptlang.org/) v4.7.2 
- [Nx](https://nx.dev/) v14.4.3
- [MobX](https://mobx.js.org/README.html) v3.4.0 (mobx-react-lite)
- [React Flow](https://reactflow.dev/) v10.3.12 
- [Jest](https://jestjs.io/) v27.5.1
