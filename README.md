# DigitalMenu
<img style="height: 120px; width: 120px;" src="./assets/readme/DigiMenu.png"/>

**Front end React app: https://github.com/AwesomeZaidi/Digital-Menu-Frontend**

## API Endpoints
## User Profiles
**`POST /users/v0/signup`**
    - **Arguments:** fullName, email, password.
    - **Returns:**   user obj created in database, header set.

**`POST /users/v0/login`**
    - **Arguments:** email, password.
    - **Returns:**   user obj, header set.
    
**`DELETE /users/v0/logout`**
    - **Arguments:** email, password.
    - **Returns:**   user obj, header set.

## Restaurants
**`INDEX GET /restaurant`**
    - **Arguments:** 
    - **Returns:**   
**`CREATE GET /restaurant`**
    - **Arguments:** 
    - **Returns:**   
**`READ GET /restaurant/:id`**
    - **Arguments:** 
    - **Returns:**   
**`UPDATE PATCH /restaurant/:id`**
    - **Arguments:**
    - **Returns:**   
**`DELETE DELETE /restaurant/:id`**
    - **Arguments:** 
    - **Returns:**   
    
## Locations
**`INDEX GET /restaurant/:id/location`**
    - **Arguments:** 
    - **Returns:**   
**`CREATE GET /restaurant/:id/location`**
    - **Arguments:** 
    - **Returns:**   
**`READ GET /restaurant/:id/location/:id`**
    - **Arguments:** 
    - **Returns:**   
**`UPDATE PATCH /restaurant/:id/location/:id`**
    - **Arguments:** 
    - **Returns:**   
**`DELETE DELETE /restaurant/:id/location/:id`**
    - **Arguments:** 
    - **Returns:**   

### User Narratives
 - As a user, I want to update, add, or delete an individual item from my menu database, in order to have my entire menu organize in one single source of truth.
 - As a user, I want to be able to login, in order to view my restaurant’s menu.
 - As a user, I want to give out different API Keys to vendors, in order to allow them to get a secure access to my menu.
  - As a user, I want to manage my vendors, in order to delete and add vendors that are allowed to use my menu.
 - As a vendor, I want to make a GET request to the restaurant’s menu, in order to display it in my application (i.g. GrubHub, Website, POS, Postmates, etc).
 - As a vendor, I want to make a GET request for an individual item in the restaurant’s menu, in order to display that into my hosted application.

### User Journey
After finishing a meeting with GrubHub, Victoria was asked to give GrubHub an updated version of Pinecrest Bakery’s complete menu. On top of GrubHub, Victoria has made several deals with other online ordering vendors like Uber Eats, Postmates, MealPal, and DoorDash. Even has a redesign company website, which all are demanding a updated complete menu of Pinecrest Bakery. Victoria is easily able to send a link of her online digital menu database. A full detailed menu that all vendors can easily access through a simple RESTful API. She can also update any changes on the menu and will update automatically to all the locations Pinecrest Bakery displays their menu. Victoria is excited to see how much time she has saved from using a single source of truth for her menu. Victoria does not need to struggle anymore like before to update each individual application in case there is a price or item change in the menu. 

### Wireframe
[Live Update](https://balsamiq.cloud/s282s2f/pve4ia6)
### Entity Relationship Diagram
<img src="./assets/readme/digitalMenu_ERD.png"/>