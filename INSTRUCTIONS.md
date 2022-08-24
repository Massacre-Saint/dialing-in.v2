# Team Roster
For this project you will be building a team roster.  Pick any kind of team you want (ie sports, educational, club, choir, etc).  Theme your project based on the type of team.

## Requirements
Take some time to plan your project and track how the data will flow. **It is expected that you will complete this assignment by the due date, so plan accordingly.**

Here is the ERD for this project:

![Screen Shot 2022-07-23 at 9 39 12 AM](https://user-images.githubusercontent.com/29741570/180609833-7f231bf4-42a5-4f0a-b8b1-fae1c78cffc4.png)

Here are the user stories that need to be completed:
### Authentication
* As a user, who is logged out, I should only be able to see the authentication screen
* As a user who is logged out, I would like to be able to click on an authentication button and login via google.
* As a user who is logged in, I should not be able to see the authentication button.
* As a user who is logged in, I should be able to see the Team view.
* As a user who is logged in, I should be able to see a log out button

### Routing
* As an authenticated user, if I click the TEAM link in the navbar, I should navigate to '/team' and see an h1 tag that says 'Team'.
* As an authenticated user, if I click the NEW link in the navbar, I should navigate to '/new' and see an h1 tag that says 'Add a Member'.

### CREATE Members
* As an authenticated user, when I create a member, the member object should include my uid.
* As an authenticated user, I should be able to click the NEW link in the navbar that displays a form to add a new member.
* As an authenticated user, when I fill out the form and submit a new member should be created in firebase and should now show in my Team view.

### READ Members
* As an authenticated user, I should be able to see the Team view with all the members I have created.
* As an authenticated user I should not be able to see members that were created by another user.

### UPDATE Members
* As an authenticated user, I should be able to see an edit button on each member card.
* As an authenticated user, when I click the edit button I should see a form with the member information pre-populated in the form.
* As an authenticated user, I should be able to edit the information in the form and hit the submit button.
* As an authenticated user, when I submit the edit form firebase should be updated (PATCH request) and the Team view should update

### DELETE Members
* As an authenticated user, I should see a delete button on each member.
* As an authenticated user, when I click a delete button that member should be removed from firebase and the Team view should update.

---

# :red_circle: STOP :red_circle:
## Create an MVP branch from the main branch after completing all MVP and push it up to Github before starting stretch goals

---

## STRETCH 1
* As an authenticated user, I can search my members

## STRETCH 2
Now that we have an application that can create a single team roster, we want to expand the application to be able to have multiple teams. You will need to update your ERD for this relationship.

Note: 
- A team can be public or private
- A member can only be on one team
- A member should be able to be updated/added to another team

### Routing (you will need to refactor)
* As an authenticated user, if I click the TEAMS link in the navbar, I should navigate to '/teams' and see an h1 tag that says 'Teams'.
* As an authenticated user, if I click the NEW link in the navbar, I should navigate to '/new' and see an h1 tag that says 'Add a Team'.
* As an authenticated user, if I click the MEMBERS link in the navbar, I should navigate to '/members' and see an h1 tag that says 'Members'.
* As an authenticated user, if I click the View link on the Team card, I should navigate to '/team/{{TEAMID}}' and see the members on that team

### UPDATE Members
* As an authenticated user, I should be able to update the team that a member is assigned to

### READ Members
* As an authenticated user, I should be able to see the member's assigned team on the member cards

### CREATE Teams
* As an authenticated user, I should be able to click the NEW link in the navbar that displays a form to add a new team.
* As an authenticated user, when I fill out the form and submit a new Team should be created in firebase and should now show in my Teams view.

### READ Teams
* As an authenticated user, on the home view, instead of members, I should see all my teams with an affordance to view details on each card
* As an authenticated user, I should be able to see the Team view with all the teams I have created.
* As an authenticated user I should not be able to see teams that were created by another user.

### UPDATE Teams
* As an authenticated user, I should be able to see an edit button on each team card.
* As an authenticated user, when I click the edit button I should see a form with the team information pre-populated in the form.
* As an authenticated user, I should be able to edit the information in the form and hit the submit button.
* As an authenticated user, when I submit the edit form firebase should be updated (PATCH request) and the Teams view should update

### DELETE Teams
* As an authenticated user, I should see a delete button on each team.
* As an authenticated user, when I click a delete button that team as well as all members on that team should be removed from firebase and the Team view should update.

## STRETCH 3: Public / Private Teams
* A team can be marked public or private
* If a team is public, any authenticated user can view the team and its members along with creator details

## STRETCH 4: Make Trades
This will require updates to the ERD

* On public teams, users who did not create the team can ask to aquire a team and select one of their own PUBLIC teams to trade
* A new link is added to the navigation named "Trade Requests" and there is a notification indicator that a request is in progress

