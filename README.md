# Assignment 3

This is the 3rd and last assignment for E-39 Design Principles in React. Here we will continue to work on our timers from Assignment 2, using them to build a full application that can be deployed and used for workouts.

## Requirements
In assignment 2 we built 4 independent timers: Countdown, Stopwatch, XY and TABATA. The final Workout Timer application allows users to add multiple timers that can run sequentially. For example, the user can choose to configure their workout as follows:

- Coundown:   10:00
- XY:         6 rounds of 30 seconds
- Coundown:   5:00
- TABATA:     8 rounds, 20s work/10s rest

Total time:   10:00 + 3:00 + 5:00 + 4:00 = 22:00

The application should have 2 screens:

### Home - Path should be `/`
- list of timers to be run (use should be able to Remove a timer)
- the total time the workout will take
- controls to start/pause workout
- button to "Add" a new timer

### Add Timer - Path should be `/add`
When user clicks "Add" from **Home** screen, they are routed to this page, where they can choose the type of timer and configure its options (`timeCap`, `startTime`, `rounds`, `timePerRound` or `workTime`/`restTime`) depending on what timer is selected. After configuring, they user confirms and the timer is added to the list.

## Running the Timer
When the user starts the workout from the Home screen, the app shows the current Timer depending on time. In the example above it would go as follows:

- Display shows Countdown for first 10:00
- Then switches to XY, running 6 rounds of 30s each
- Then shows Countdown for 5:00
- Finally shows TABATA for 8 rounds of 20s/10s

## Design
As always, provide a clear explanation for your design choices in a DESIGN.md file. The slides shown in lecture are for illustrative purposes so you don't have to follow them for your application. The only requirement in user flow is that there are two separate pages, Home and Add as described above.

## Things to remember
- compose and abstract functionality to DRY your code
- clean up your timers and avoid memory leaks and state that could lead to infinite loops
- adhere to the spec of each timer

## Deliverables
Because this is an extension on Assignment 2, you can clone this repo and copy over all files from A2 into here (except the .git folder). As usual, we should be able to run your project simply with `npm install` and `npm start`.
