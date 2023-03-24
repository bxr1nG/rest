# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.2](https://github.com/bxr1nG/rest/compare/v0.0.1...v0.0.2) (2023-03-24)


### Features

* **client:** add filters ([35c8a25](https://github.com/bxr1nG/rest/commit/35c8a25b9b540e62f05cf51f921bcd6d9831c678))
* **client:** add includes ([22d844b](https://github.com/bxr1nG/rest/commit/22d844b435b1050b8d638a1bace06ea058cf6a7c))
* **server:** add include support for ORM queries ([812d4c6](https://github.com/bxr1nG/rest/commit/812d4c6a28306a2b4405805396f8ffd836979c96))
* **server:** add ORM for creating queries ([6cc6137](https://github.com/bxr1nG/rest/commit/6cc61370412e0459ba51711d3344f0f7bbca0e7e))


### Bug Fixes

* **client/table:** remove sticky header due to columns width ([9d1189d](https://github.com/bxr1nG/rest/commit/9d1189d4bdd2d0a32fc845ce60cd31d5c0be6c2c))
* **client:** add ability to use custom id column ([0d6ce1d](https://github.com/bxr1nG/rest/commit/0d6ce1df8a833f02c5c9fff5e7dd84fa99348de6))
* **client:** add error notifications ([d80c768](https://github.com/bxr1nG/rest/commit/d80c768339716c367f16eabf1c0f9ee23fda9b47))
* **client:** add range and sort URL params ([bcb41e7](https://github.com/bxr1nG/rest/commit/bcb41e7a79d0af5a037c05e95a2840d41092f522))
* **client:** add responsibility ([f29c0b7](https://github.com/bxr1nG/rest/commit/f29c0b721b8a0a9a8201075b6a8ddd528dec3ce4))
* **client:** add theme switch ([c1d5687](https://github.com/bxr1nG/rest/commit/c1d5687c93f4137c103f81a1a5c0dfbc5faea63d))
* **client:** add useViewport hook ([9764307](https://github.com/bxr1nG/rest/commit/97643074179a08129d23bb01866845474f1a7249))
* **client:** fix equal filter ([b0045d6](https://github.com/bxr1nG/rest/commit/b0045d600ee30262182a35c123a56b5494778d79))
* **client:** fix remove many include ([1cf750b](https://github.com/bxr1nG/rest/commit/1cf750bbf1c4f250ec3e94a541a6c2113f212106))
* **server/api:** add ability to use custom id column ([f963c66](https://github.com/bxr1nG/rest/commit/f963c6662fd5956a82313659dce344ab22c35cb9))
* **server:** add recursive include ([1a7d3e5](https://github.com/bxr1nG/rest/commit/1a7d3e535299c2d4cff074304eb1a877c11bd512))


### Docs

* **dockerhub.md:** add readme for dockerhub ([5829a08](https://github.com/bxr1nG/rest/commit/5829a0855238c6a292f4f70693f69a6151009d04))

### 0.0.1 (2023-03-15)


### Features

* add api error handling middleware ([6ed25db](https://github.com/bxr1nG/rest/commit/6ed25dbdaa2d305d9bb5db9e0231b9fdccc30460))
* **client:** add Ant Design and React Router ([e6c2d8c](https://github.com/bxr1nG/rest/commit/e6c2d8cf169cc34bb37fc2be38c8e3a110802369))
* **client:** add Layout menu ([b3ec4fe](https://github.com/bxr1nG/rest/commit/b3ec4fe59fcfebac11472933c5e2436feae7f3d8))
* **client:** add pagination, sort and search to Players table ([8a821af](https://github.com/bxr1nG/rest/commit/8a821af840bbee46f7d4d0768c915d3bed2f9759))
* **client:** add Players table ([c60a3be](https://github.com/bxr1nG/rest/commit/c60a3beb84909be0c79294fc4d856ff493663445))
* **server:** add api error handling middleware ([b764e6c](https://github.com/bxr1nG/rest/commit/b764e6c2a7bf693a02e55eae6d8b30f7efcb98d4))
* **server:** add endpoints for players ([f5efe19](https://github.com/bxr1nG/rest/commit/f5efe195b7572e823e7a4d40f6d79e81101d90d0))


### Bug Fixes

* **client/player:** fix table position ([9415deb](https://github.com/bxr1nG/rest/commit/9415debebd4ddd53e4810ec80b2d0e8086ede51b))
* **client:** create pages for abstract data ([a1df5bc](https://github.com/bxr1nG/rest/commit/a1df5bca73fef4a7fa0368040148c9df8fb0a453))
* **client:** refactor code ([01608b6](https://github.com/bxr1nG/rest/commit/01608b6342e6a33f67aa4726ac92234f6bf95fd6))
* fix search ([917e563](https://github.com/bxr1nG/rest/commit/917e5634866d6c06f0746722ebd3276c1cea1990))
* **server/api:** add ErrorHandler ([5a53172](https://github.com/bxr1nG/rest/commit/5a53172b4a3edbb0ad60d1a861d17ac26fe262f4))
* **server:** add search by fields from client ([d4ea5e6](https://github.com/bxr1nG/rest/commit/d4ea5e66fd4ab15a24216ef106c8c1160b322390))
* **server:** create abstract routes that uses table name and id ([f1545d9](https://github.com/bxr1nG/rest/commit/f1545d9d913e5888e4249c9f14c2df6c83a2d343))


### Others

* add commit-msg commitlint husky hook ([b33dce5](https://github.com/bxr1nG/rest/commit/b33dce59edd0b73d728107723f8878a36c707480))
* add commitizen for better commit messages ([e61bcce](https://github.com/bxr1nG/rest/commit/e61bcce713e479520d0d595631a3baf6595eb5e3))
* add pre-commit lint-staged husky hook ([8527e5d](https://github.com/bxr1nG/rest/commit/8527e5d66575b80583f573a31ce8ff3996ab24cd))
* add standard-version for automatic versioning ([1473154](https://github.com/bxr1nG/rest/commit/14731541ac07c8dcf12f71ae0ee1c949798cb671))
* initial commit ([145e39c](https://github.com/bxr1nG/rest/commit/145e39c502fc5f4b110cfccbc91f0ba78d5cc823))
* **package-lock:** fix vulnerability ([23ce9ea](https://github.com/bxr1nG/rest/commit/23ce9ea9559b01094dcdecfd864bd3e5c13d2bce))


### Build System

* **docker:** add Dockerfile and .dockerignore ([a90b0cd](https://github.com/bxr1nG/rest/commit/a90b0cd9db821e5c9d0f914c9494f555c1682f27))
