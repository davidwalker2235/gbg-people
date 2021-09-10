List frontend application for the visualization of characters of Brastlewark city

# GBG Web app

### To run the project:

* Clone the project:

### `https://github.com/davidwalker2235/gbg-people.git`

* Install dependencies:

### `npm install`

* Start the project:

### `npm start`

* The app will be oppened in your default browser with localhost:3000

### Used technology


* React (https://es.reactjs.org/)
* Typescript (https://www.typescriptlang.org/)
* Redux (https://redux.js.org/)
* React-Query (https://react-query.tanstack.com/)
* Axios (https://www.npmjs.com/package/axios)
* React router (https://www.npmjs.com/package/react-router)
* Material UI (https://material-ui.com/)
* The project has been prepared to implement a translation system, using a dictionary for all the texts of the application (file: 'locale.ts')
* Two screens have been included (cover and main pages) to show that the application uses a routing system

### Screens and how to use:

#### Cover Screen

* To enter to app click on 'Enter' button
#### Main Screen

* Click on 'Search by name' field to filter by name
* Click on 'New User' to show new user modal and create a new person.
* Click on a row for show the person's details and be able to edit or delete the person.
* Click on Filter (upper left corner) for open extensible filtering.

## Back-end side:
Although I had no previous experience with AWS (I have always worked with Azure Devops) I have implemented an 
API Gateway that connects with Lambda functions and extracts the information from a MySql database hosted on an AWS RDS.

The endpoints and their corresponding lambda functions are:

* POST - /create-person
  * Method that create a new person and put it in the DB 
  
    Associated Lambda function:
```javascript
    const getValues = (event) => {
    let valuesStr = '';
    const keysCounter = Object.keys(event).length;
    Object.keys(event).forEach((key, index) => {
      valuesStr = valuesStr + `'${event[key]}'${(index !== (keysCounter - 1)) ? ',' : ''}`;
    });
    return valuesStr;
    }

    exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!

      let sqlString = `INSERT INTO person (${Object.keys(event).join()}) VALUES (${getValues(event)})`;
      connection.query(sqlString, function (error, results, fields) {
        connection.release();
  
        if (error) callback(error);
        else callback(null, results);
      });
    })}
```
* DELETE - /delete-person
    * Method tha delete a person of the DB
      
      Associated Lambda function:
```javascript
  exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!
  let sqlString = `DELETE FROM person where id = ${event.params.querystring.id};`;
  
  connection.query(sqlString, function (error, results, fields) {
    connection.release();
  
    if (error) callback(error);
    else callback(null, results);
  });
  });
  };
```
* GET - /get-all-cities
    * Method that select all the city values stored in the DB to populate the Select filter component

      Associated Lambda function:
```javascript
      exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!

  connection.query('SELECT DISTINCT(home_city) FROM person;', function (error, results, fields) {
  connection.release();

      if (error) callback(error);
      else callback(null, results);
  });
  });
  }
```
* GET - /get-all-gender
    * Method that select all the gender values stored in the DB to populate the Select filter component

      Associated Lambda function:
```javascript
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    connection.query('SELECT DISTINCT(gender) FROM person;', function (error, results, fields) {
      connection.release();

      if (error) callback(error);
      else callback(null, results);
    });
  });
}
```
* GET - /get-all-values
    * Method that counts all DB rows for calculate the number of pages of the list.

      Associated Lambda function:
```javascript
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    connection.query('SELECT COUNT(*) FROM person', function (error, results, fields) {
      connection.release();

      if (error) callback(error);
      else callback(null, results);
    });
  });
}
```
* POST - /get-filtered-values
    * Method that returns a filtered person's list.

      Associated Lambda function:
```javascript
const parseArray = (sqlString, event, key, fatherIndex) => {
  if(event[key].length) {
    sqlString = (fatherIndex === 0) ? sqlString + '(' : sqlString + ' AND (';
    event[key].forEach((elem, index) => {
      if(index === 0) {
        sqlString = sqlString + `${key} LIKE '%${elem}%'`;
      } else {
        sqlString = sqlString + ` OR ${key} LIKE '%${elem}%'`;
      }
    });
    sqlString = sqlString + ')';
  }

  return sqlString;
};

exports.handler = (event, context, callback) => {
  let sqlString = 'SELECT * FROM person WHERE ';
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    const keys = Object.keys(event);

    keys.forEach((key, index) => {
      if (index === 0) {
        if(Array.isArray(event[key]) && event[key].length) {
          sqlString = parseArray(sqlString, event, key, index);
        } else {
          if(event[key].length) sqlString = sqlString + `${key} LIKE '%${event[key]}%'`;
        }
      } else {
        if(Array.isArray(event[key]) && event[key].length) {
          sqlString = `${parseArray(sqlString, event, key, index)}`;
        } else {
          if(event[key].length) sqlString = sqlString + `AND ${key} LIKE '%${event[key]}%'`;
        }
      }
    });

    connection.query(sqlString, function (error, results, fields) {
      connection.release();

      if (error) callback(error);
      else callback(null, results);
    });
  });
}
```
* POST - /get-page
    * Method that returns a specific number of values to show in the person's list. (By default 10 rows per page)

      Associated Lambda function:
```javascript
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    connection.query(`SELECT * FROM person LIMIT ${event.start},${event.end}`, function (error, results, fields) {
      connection.release();

      if (error) callback(error);
      else callback(null, results);
    });
  });
}
```
* GET - /get-person-data
    * Method that returns a specific person data by ID to show it in details section

      Associated Lambda function:
```javascript
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    connection.query(`SELECT * FROM person WHERE id=${event.params.querystring.id}`, function (error, results, fields) {
      connection.release();

      if (error) callback(error);
      else callback(null, results);
    });
  });
}
```
* PUT - /update-person
    * Method that update the data values of a specific person by ID of the DB

      Associated Lambda function:
```javascript
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    connection.query(`SELECT * FROM person WHERE id=${event.params.querystring.id}`, function (error, results, fields) {
      connection.release();

      if (error) callback(error);
      else callback(null, results);
    });
  });
}
```

## TO-DO
Due to time constraints, the following enhancements could not be implemented

* Creation of a module to capture photos in the process of creating a new person
* The photos have been stored in client part. It could be better to storage them in a cloud storage. I didn't do it because AWS isn't free  :-(
* No test implemented
* No translation module implemented.
* More filter options (For instance, a scroll bar to select the age range)

## DIFFICULTIES
* I've never used AWS, in fact, I didn't even have an account!!
* I've to learn how connect different AWS services (Lambda methods and MySql DB, RDS API with Lambda, etc...)
* I am a specialist in Front-end technologies, so the back-end part could be improved. In spite of everything, I have managed to move the project forward
## About me

* David Carmona Maroto (https://www.linkedin.com/in/davidcarmonamaroto/)
