
# Bolt Store 🏪

A small full-stack e-commerce project built with Postgres, Express, React and Node.

## [Click here to try out the current live version](bolt-store-deploy.herokuapp.com/)

<!-- TABLE OF CONTENTS -->

## :ledger: Index

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
     <a href="#hammer-built-with">Built With</a>
    </li>
    <li>
      <a href="#zap-getting-started">Getting Started</a>
      <ul>
        <li><a href="#electric_plug-installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#fire-contributing">Contributing</a></li>
    <li><a href="#cactus-to-do-in-the-future">To-do in the future</a></li>
  </ol>
</details>

## :beginner: Features
- User can Login with normal email/password or using Oath2
- User can register
- User can edit personal Information
- User can manage admin dashboard, delete user, sort user,... Only admin can access this page
- User can add to cart, view cart, checkout using stripe payment.
- All orders are saved 

## :hammer: Built With
- Frontend
* React JS
* React Redux, Redux Toolkit
* React Router
* Tailwindcss
* Ant Design

- Backend
* Nodejs
* Express
* Passportjs
* jsonwebtoken

## :book: Algorithms

**Dijkstra's Algorithm** (weighted): the father of pathfinding algorithms; guarantees the shortest path

<!-- GETTING STARTED -->

## :zap: Getting Started

### :electric_plug: Installation

```bash
git clone https://github.com/dkevin96/pathfinding-visualizer.git
cd pathfinding-visualizer
yarn install
yarn start
```

<!-- CONTRIBUTING -->

## :fire: Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## :cactus: To-do in the future

I have these ideas in mind that either further expand the existing features or are new features themselves.

### Add More Search Algorithms

Possible additions are:

- Breath-first Search (unweighted): a great algorithm; guarantees the shortest path
- Depth-first Search (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path
- Add more heurtistics for informed search algorithms and allow users to switch between them.

### Add Weighted Nodes

Currently it costs 1 step to travel from a node to any of its neighbours. Adding Weighted nodes that cost more to travel through would highlight how different algorithms behave if travel costs are not uniform. (E.g. BFS would not guarantee the optimal path if travel costs are not uniform)
