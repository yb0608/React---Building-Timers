# React Timers

This emplementation is to build a full application with different types of timers that can be deployed and used for workouts.

## Timer Types
There are 4 independent timers: Countdown, Stopwatch, XY and TABATA. The final Workout Timer application allows users to add multiple timers that can run sequentially. For example, the user can choose to configure their workout as follows:

- Coundown:   10:00
- XY:         6 rounds of 30 seconds
- Coundown:   5:00
- TABATA:     8 rounds, 20s work/10s rest

Total time:   10:00 + 3:00 + 5:00 + 4:00 = 22:00

The application should have 2 screens:

### Home - Path `/`
- list of timers to be run (use should be able to Remove a timer)
- the total time the workout will take
- controls to start/pause workout
- button to "Add" a new timer

### Add Timer - Path `/add`
When user clicks "Add" from **Home** screen, they are routed to this page, where they can choose the type of timer and configure its options (`timeCap`, `startTime`, `rounds`, `timePerRound` or `workTime`/`restTime`) depending on what timer is selected. After configuring, they user confirms and the timer is added to the list.

## Running the Timer
When the user starts the workout from the Home screen, the app shows the current Timer depending on time. In the example above it would go as follows:

- Display shows Countdown for first 10:00
- Then switches to XY, running 6 rounds of 30s each
- Then shows Countdown for 5:00
- Finally shows TABATA for 8 rounds of 20s/10s

## Design
All of the design choices are in a DESIGN.md file.

## How To Run The Project

It is required that you have `node` and `npm` installed. In the project directory, you will run:

`npm i`

to install. And then run

`npm start`

to run the app in the development mode. Open http://localhost:4000 to view it in the browser.

If you have `node` installed, download the files and run your project simply with `npm install` and `npm start`.
