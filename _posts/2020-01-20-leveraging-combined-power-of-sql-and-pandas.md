---
published: true
title: "Leveraging combined power of SQL and Pandas"
date: 2019-01-20
categories:
  - Pandas
  - SQL
  - Python
---
![](https://miro.medium.com/max/1710/1\*LZ4\_i8qifjfM4UsgjslBQw.png)
*An illustration of using SQLite and Pandas to extract information from data*

*Complementing pandas with sqlite3 would extend more tools for data wrangling*

Introduction
============

While many still use SQL queries in their work to extract key information. We know that pandas is a powerful library for data wrangling and data aggregation in python. Thankfully Python programming allows one to take advantage of SQL too using the SQLite package. The ‘sqlite3’ module is included in the python library since Python 2.5, importing the package would let one fetch the data using queries.

One can create database in Python using sqlite **Connection** object.

```
**import** **sqlite3  
**\# Create a database orpita and a connection new\_con  
new\_con = sqlite3.connect(r"orpita\_.db")
```

Using the above code would create a Connection object in the default directory to store the data. However, if the name of the Connection object already exists in the present directory, the variable ‘new\_con’ would use that database.

An important point to note before we jump to trying is that SQLite is a serverless database engine. It is very popular in apps and software but should not be considered as a replacement for client/server database engine like MySQL, MS-SQL etc.([read more](https://www.sqlite.org/about.html))

Working with Pandas and SQL
===========================

**I. Converting pandas dataframes into SQL tables**

The pandas dataframes can be stored as tables in the newly created database. And the tables can be read from Pandas using read\_sql\_query

```
**import** **pandas** **as** **pd  
**\# loading 3 csv files  
regionlist\_df = pd.read\_csv(r'regionlist.csv')  
countrylist\_df = pd.read\_csv(r'countrylist.csv')  
provinces\_df = pd.read\_csv(r'provinces.csv')\# sending tables to database  
regionlist\_df.to\_sql('regionlist\_df', new\_con)  
countrylist\_df.to\_sql('countrylist\_df', new\_con)  
provinces\_df.to\_sql('provinces\_df', new\_con)\# viewing the tables present in new database  
pd.read\_sql\_query('select \* from sqlite\_master', new\_con)
```

![](https://miro.medium.com/max/1470/1*0QSqvOYBet_5dOt4gUK3Fw.png)

Tables created inside the database

Once we have a connection and data tables we could create a **Cursor** object to execute the structured queries.

```
\# create a cursor object which connects with Connection **'**new\_con'  
cur = new\_con.cursor()\# to execute the SQL query, provide top 5 rows from a table   
cur.execute("SELECT  \* FROM regionlist\_df LIMIT 5")\# to fetch the query result  
cur.fetchall()'''  
\# Output  
\>>\[(0, 3000432767, 'City', None, None, 'Bury', 'Bury, Quebec, Canada', 11183),  
 (1, 6213185, 'Metro Station', None, None,'Queen Station','Queen Station, Toronto, Ontario, Canada', 6057934),  
 (2, 31, 'Country', None, None, 'Canada', 'Canada', 500001),  
 (3, 11111, 'Province (State)', None, None, 'Alberta', 'Alberta, Canada', 31),  
 (4, 11117, 'Province (State)', None, None, 'British Columbia', 'British Columbia, Canada'  31)\]  
'''
```

**II. Converting SQL tables into pandas dataframes**

Conversely, the data tables can be extracted from database and converted into pandas dataframes. In the example below a [pokemon sqlite](https://github.com/decentralion/PokemonSQLTutorial/blob/master/pokedex.sqlite) is used.

```
#Create a new conncetion con  
con = sqlite3.connect("./pokedex.sqlite")  
cur=con.cursor()_\# Let us see the list of tables in the DB_  
cur.execute("SELECT name FROM sqlite\_master WHERE type='table';")  
cur.fetchall()
```

![]("https://miro.medium.com/max/1608/1*kT21CoSWTi1cLXi140zhYQ.png)

Output for above codes provides list of all the tables

The output in for the SQL queries comes in list format. For each data set table and index are stored separately in database. So, putting a condition would allow to select the desired table which are to be used as pandas dataframe.

```
\# Create a dataframe with all the tables inside connection 'con'  
df = pd.read\_sql\_query('select \* from sqlite\_master', con)  
tbl\_list = list(df\[df\['type'\] == 'table'\]\['name'\])\# create dataframes in a loop**  
for** table **in** tbl\_list:  
    globals()\['**%s**\_df' % table\] = pd.read\_sql\_query('select \* from **{0}**'.format(table), con)  
    print('**{0}**\_df'.format(table))
```

![](https://miro.medium.com/max/1608/1*VmUbSAZKMYXbzCU_aVuIWg.png)

Above code would result in creation of new data frame in your environment

The above code allows us to create dataframes from the tables which could then be used to perform more complex data manipulation and visualizations which are not easy in SQL.

**III. Consolidating understanding with a Challenge**

We see the utility of using sqlite3 and pandas together and using whichever seems more appropriate during programming. For SQLite it is important to define a connection and cursor for executing and fetching the queries. Pandas dataframes could be converted to tables and vice-versa.

There was a challenge thrown to me by my colleague and you are encouraged to solve to test your understanding.

A csv file ‘regionlist’ ([here](https://github.com/kshitijmamgain/Lantern-Projects/blob/master/Dataset/regionlist.csv)) has multiple levels of hierarchy in one single column. Our goal is to see when a region id is entered we know — region\_name, province\_name, country\_name. _But,_ with out any loop.

![](https://miro.medium.com/max/1406/1*sQBiJkBl6pPjHIcwPwhA-Q.png)

Challenge : Snap shot of data

**Challenge:** Define a function, which asks regionid and returns its — region name, high level region, province and country, with out using any loop.

Let you answers in the comments below, one of the solution is [here](https://github.com/kshitijmamgain/Lantern-Projects/blob/master/SQL_and_Visualization_Python.ipynb).
