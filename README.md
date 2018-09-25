# Food-App
## Motivation for Development
Quick, and easy way to find a place to eat. 
FourZato uses two different endpoints to search for places to eat.

## Endpoints
### FourSquare
 /search to search, and find things more specifically.

### Zomato
 /search endpoint
For types of restaurants near your location.


## Future Development:
### Challenges: 
#### Two different API 
Only use one api for food information. FourSquare, and Zomato each have different databases for food,
and do not show all of the same places. Should use a more robust API, with a better
venue coverage. 

### API Request Limits
Currently FourSquare, and Zomato have limits on what, and how much can be returned with the free trial.
This limited us in terms of what we wanted to use, or how much data to display.

FourSquare: 10,000 calls a day, and 500  Premium calls a day (The limiting factor)
Premium Endpoints include the following:
Venue Details: /v2/venues/X
Venue Photos: /v2/venues/X/photos
Venue Tips: /v2/venues/X/tips
Venue Hours: /v2/venues/X/hours
Venue Menu: /v2/venues/X/menu
Venue Links: /v2/venues/X/links
Venue Events: /v2/venues/X/events


Zomato: 
1000 calls a day. Originally we wanted to use FourSquare to look up venues, and have Zomato return the data.  Unfortunatly to look up information for a venue, you must have it's ID.  
We would have to make 2-3 calls to get information from FourSquare to translate to Zomato.

Map Integration:
Use MapQuest, or Google Maps to bring another display element to show how far away
places to eat are.

