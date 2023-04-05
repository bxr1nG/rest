# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.3](https://github.com/bxr1nG/rest/compare/v0.0.2...v0.0.3) (2023-04-05)


### Features

* **server/orm:** add logging decorators ([3ea2fae](https://github.com/bxr1nG/rest/commit/3ea2fae50a36f0c89813abe47ffdcf7406d0f79a))
* **server/orm:** add methods to get database tables and table columns ([307898f](https://github.com/bxr1nG/rest/commit/307898f58232a40cc2acf663a796372c805087c8))
* **server/orm:** add ORM strategy that uses join for include ([914243e](https://github.com/bxr1nG/rest/commit/914243ea4a2d451ecaad013a80bcb0e3dad7dd7e))
* **server/orm:** add ORM strategy that uses one query per include ([8e0de91](https://github.com/bxr1nG/rest/commit/8e0de91c230c90a792feeb91121c23d9b277922d))
* **server/orm:** add strategy for ORM ([1c3344c](https://github.com/bxr1nG/rest/commit/1c3344cc63885a4a628b614264e40b53fb467eb2))
* **server:** add api docs in swagger ([ef207be](https://github.com/bxr1nG/rest/commit/ef207be7a98b5400599e7784c022eca62eb40aae))
* **server:** add routes for database tables and table columns ([e61441b](https://github.com/bxr1nG/rest/commit/e61441be9b791788b3f497af432a81c05ab8da1f))


### Bug Fixes

* **client:** add autocomplete for table and column fields ([0ae8006](https://github.com/bxr1nG/rest/commit/0ae8006e04088d4407ae5843516cd6179ea56919))
* **client:** add dropdown to select table ([94fb606](https://github.com/bxr1nG/rest/commit/94fb606685dd8a417273ad1e1d48ac2f94d8ad2a))
* **client:** add favicon, add public folder remove in Dockerfile ([e3eeeae](https://github.com/bxr1nG/rest/commit/e3eeeae7de3ed91275c54f3e0c6b339a047c9407))
* **client:** fix error messages ([195d7c9](https://github.com/bxr1nG/rest/commit/195d7c9ad35324ea48fe3a1a6996188b48367983))
* **client:** fix filter type ([3a13db5](https://github.com/bxr1nG/rest/commit/3a13db5f7f981a81b9d80376fca2e628aa803b1b))
* **client:** fix ParsedSearchParamsProvider ([f2f7c1b](https://github.com/bxr1nG/rest/commit/f2f7c1b81a99a21e87ff6c7065a4471e39ebdc62))
* **client:** fix webpack "size exceeds limit" error ([9f9de8c](https://github.com/bxr1nG/rest/commit/9f9de8c2d0874caca45400ac5395ec3741ab7a27))
* **client:** refactor code ([301ac4a](https://github.com/bxr1nG/rest/commit/301ac4a3960dff8949700ca479aa379160e04ce6))
* **server/orm:** fix concat statement ([bf2c54e](https://github.com/bxr1nG/rest/commit/bf2c54e72842c118bf8ae24b98060ef0c6f717c8))
* **server/orm:** fix query log ([100f51f](https://github.com/bxr1nG/rest/commit/100f51f08bda07df901a8072c41d1596478e761b))
* **server/orm:** fix time measuring decorator ([80c85b6](https://github.com/bxr1nG/rest/commit/80c85b6cdc7465d5deb249a16c95da82423b51d6))
* **server/orm:** refactor include method, fix time mesuring decorator ([3589541](https://github.com/bxr1nG/rest/commit/35895416885eba68ea029bb24c3c2e037b174f26))
* **server/orm:** use sql params for where section ([c6b5f2c](https://github.com/bxr1nG/rest/commit/c6b5f2cf0d386e8e8b18c72bcbb6c45062f353be))
* **server/tsconfig.json:** remove package.json from include ([2226f8a](https://github.com/bxr1nG/rest/commit/2226f8a936aab5a16df20b634a35cbc5056922fc))
* **server/types:** fix include params types ([8bb16f4](https://github.com/bxr1nG/rest/commit/8bb16f4c7ad6e969cac33d759481b4fe9da2956a))
* **server:** fix swagger doc ([dd4f4d3](https://github.com/bxr1nG/rest/commit/dd4f4d362e37eaf023da815f5538c464bf8e85da))
* **server:** remove params property from Include type ([096131b](https://github.com/bxr1nG/rest/commit/096131bd62a12b7870405f3b88d47cbcb54c1cca))

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
