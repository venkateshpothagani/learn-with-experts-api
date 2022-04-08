# Changelog

All notable changes to this project will be documented in this file

## [Released]

---

## [Unreleased]

## [0.1.0] - 2022-03-16

### Added

-   Auth. related endpoints (login, signup) and user model added.
-   Database connection added.

### Changed

-   Minor changes to the code in `index.ts` and `app.config.ts`.

### Removed

-   `MongoDB` dependency removed(using `mongoose`).

### Fixed

-   In `routes.ts`, assigned the correct controller to the correct end-point.

---

## [0.2.0] - 2022-03-19

### Added

-   CORS
-   JWT
-   RefreshToken model to save refresh tokens.
-   `refresh` _to generate access token_ and `logout` end points.
-   bycrypt to encrypt passwords.

### Changed

-   Related functions are grouped with classes. ex:- controllers
-   Some changes in code formatting.
-   Some minor changes.

### Removed

-   `bodyparser` removed from dependency. `express.json` used to parse request.

### Fixed

-   No fixes

---

## [0.3.0] - 2022-03-20

### Added

-   post, comment, vote and experts related route's basic functionality completed.
-   id column (stores uuid) added in all models.

### Removed

-   QA routes files removed.

### Changed

-   scripts changed in package.json.
-   Minor changes in logout method in Auth. controller.
-   Reply changed to comment.
-   Versions in CHANGELOG

### Fixed

-   No fixes.

---

## [0.3.1] - 2022-03-20

### Added

-   CRUD operations related code moved to a new file.
-   Code duplication reduced.

### Removed

-   Nothing removed

### Changed

-   No changes

### Fixed

-   No fixed

## [0.3.2] - 2022-03-21

### Added

-   Auth. end points info added in README.md file.

### Removed

-   Password strength check removed for signup.

### Changed

-   Minor changes in index.ts and few routes controllers.

### Fixed

-   import error for experts and vote controllers (added export statement)

## [0.3.3] - 2022-03-21

### Fixed

-   Temporary fix for logout. Used mongodb instead of redis cache.

## [0.3.4] - 2022-03-24

### Changed

-   Few changes done to models to create relationship (One to Many Relationship).

## [0.4.4] - 2022-03-24

### Added

-   End points to update and delete user.

### Fixed

-   Few bug fixes including routing mapping and password pattern checking.

## [0.5.0] - 2022-03-26

### Added

-   Redis DB to store access and refresh token.

## [0.5.1] - 2022-03-27

### Changed

-   Minor changes.
-   Text in reponse updated.

### Fixed

-   Issues related to auth. end points are fixed.

## [0.5.2] - 2022-03-31

### Changed

-   Minor changes in models now id isn't ObjectId type.

### Removed

-   Refresh fresh token is removed. Using Redis cache and both access and refresh token saved after creating.

## [0.6.0] - 2022-04-05

### Added

-   Auth/User, Post end points are fully functional. **DON'T MAKE CHANGES IN AUTH/USERS CONTROLLERS**

### Changed

-   authorize middleware adds id in request body to assign user id while creating posts, comments and votes.
-   error messages
-   Other few minor changes

### Removed

-   Unused files and code blocks are removed.

### Fixes

-   No fixes

## [0.7.0] - 2022-04-07

### Added

-   Expert end points are completed

### Changed

-   `.then` and `.catch` are replaced with `async-await`

### Removed

-   Not used files and un-used import are moved

## [0.8.0] - 2022-04-09

### Added

-   Some info about API added in ReadME file
