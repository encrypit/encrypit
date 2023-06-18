# Changelog

## [1.0.2](https://github.com/encrypit/encrypit/compare/v1.0.1...v1.0.2) (2023-06-18)


### Bug Fixes

* **pages:** navigate to home when delete status is 404 in ShareLink ([527bee8](https://github.com/encrypit/encrypit/commit/527bee8393b8117d402ee1abb0404f2b0306b210))

## [1.0.1](https://github.com/encrypit/encrypit/compare/v1.0.0...v1.0.1) (2023-06-18)


### Bug Fixes

* **pages:** update copy for file not found in DownloadFileError ([290b0ac](https://github.com/encrypit/encrypit/commit/290b0acdb13b5ee707e51528267a4f3daf407264))

## 1.0.0 (2023-06-17)


### Features

* check password SHA512 when fetching from DownloadFile to API ([ef4ddae](https://github.com/encrypit/encrypit/commit/ef4ddaec30d0e0a2f337164a79a919217e21f97d))
* clone project from mui-template ([aa9eac9](https://github.com/encrypit/encrypit/commit/aa9eac9ca466525b230350e98604adfd89e08d33))
* **components:** add cursor pointer to Dropzone styles ([93ae208](https://github.com/encrypit/encrypit/commit/93ae2086ce01404f7a0ed02f2e0f4f8b6a717627))
* **components:** create Dropzone and render in pages Home ([03d8799](https://github.com/encrypit/encrypit/commit/03d8799a61f26cd639a4e76fbbc9964e63ca5c45))
* **components:** customize App theme so primary color is red ([5451f44](https://github.com/encrypit/encrypit/commit/5451f44bc151c58d1277d53ca3cb4fd05fa078cf))
* **components:** make "Upload" button work to UploadFile ([986faf5](https://github.com/encrypit/encrypit/commit/986faf5b1a3b89f3d81e9598b5affa3da113de65))
* **components:** redirect to /share on Dropzone upload success ([dda54d9](https://github.com/encrypit/encrypit/commit/dda54d9b98a4534115392ae9c273ace2c3fd1a14))
* **components:** refactor and improve Dropzone styles and copy ([153ace7](https://github.com/encrypit/encrypit/commit/153ace7995bb4987fc7d00b12e509036fbb2ed6d))
* **components:** render copy about file limit in Dropzone ([282bc85](https://github.com/encrypit/encrypit/commit/282bc85313a07c6ff271a0a4545af157a7b109f9))
* **components:** render Previews in UploadFile ([e80e616](https://github.com/encrypit/encrypit/commit/e80e6164b8cddb56afa29d05fe3ab2cd70b831b2))
* **components:** set Dropzone maxFiles to 1 and maxSize to 5MB ([3b7b380](https://github.com/encrypit/encrypit/commit/3b7b3808840f7260d3262468681c2d2ad58842cf))
* **components:** style Dropzone with inline styles ([bd3dc76](https://github.com/encrypit/encrypit/commit/bd3dc76a201b6a777a4f53eed98b78c189c189fb))
* **components:** upload file on drop ([02abf05](https://github.com/encrypit/encrypit/commit/02abf05455b9047a6c25d0b577d8be8398d385bd))
* create a file password and save SHA512 in customMetadata ([5e0c04a](https://github.com/encrypit/encrypit/commit/5e0c04ab80730597dc6c19b16900241ee1e20dd7))
* encrypt and decrypt zip file in UploadFile and DownloadFile ([250bfb5](https://github.com/encrypit/encrypit/commit/250bfb5564d3592340bd98e3602c8ebd0aa0e682))
* **functions:** add DELETE /api/files/[key] ([5a8695c](https://github.com/encrypit/encrypit/commit/5a8695c22428fefc96db1902a22d30056b8bdd04))
* **functions:** add endpoint POST /api/files ([669a1ae](https://github.com/encrypit/encrypit/commit/669a1aee7fdab1f5e7fdb55ab3eeea00aee97b25))
* **functions:** add GET /api/files/[key] ([736cec6](https://github.com/encrypit/encrypit/commit/736cec64ca1d1288ba27d874874471b549c0b297))
* **functions:** delete file if it has expired in GET request ([59564d9](https://github.com/encrypit/encrypit/commit/59564d91bdc0844efd66a2ee8b41a0ad3fe9d1e1))
* **functions:** upload and download file customMetadata ([22fe888](https://github.com/encrypit/encrypit/commit/22fe88852e51cfec20bce6f81b1e14afc9341589))
* **functions:** use nanoid for file key instead of uuid ([83f40ac](https://github.com/encrypit/encrypit/commit/83f40ac24c8d7c261c0802f215c681fa67ca5d1e))
* **hooks:** create useDispatch ([90dd5d6](https://github.com/encrypit/encrypit/commit/90dd5d6608a84900997d8fa73dceb275836b483c))
* **hooks:** create useSelector ([431fc82](https://github.com/encrypit/encrypit/commit/431fc8265e6cd50820dcafb149e61ea6ba0980e0))
* **hooks:** store file key on drop ([9430081](https://github.com/encrypit/encrypit/commit/94300810cf836d5fb1f44d54c01aa5ac8a819191))
* **pages:** add "Copy link" and "Email link" buttons to Share ([be928be](https://github.com/encrypit/encrypit/commit/be928be9b99cee62a4eb91e2ed16bfb4cd286da0))
* **pages:** add delete file button to Share ([c288171](https://github.com/encrypit/encrypit/commit/c288171af0da1e0f07a0854095f7bb8c1791d216))
* **pages:** add Download ([f7fc32f](https://github.com/encrypit/encrypit/commit/f7fc32fbe2ad9a81eb32d7e8dc27c02eab977725))
* **pages:** create Download ([d68488a](https://github.com/encrypit/encrypit/commit/d68488a58eba3063d96b9283f0d8db3c289b7aed))
* **pages:** create NotFound ([3a8de27](https://github.com/encrypit/encrypit/commit/3a8de27201399eabf6698510f7e13a8b6def57d3))
* **pages:** create Share with heading ([5c8e2b7](https://github.com/encrypit/encrypit/commit/5c8e2b72538048d3f5abba0bb8507663d4af5524))
* **pages:** delete when file is downloaded in Download ([07cfeed](https://github.com/encrypit/encrypit/commit/07cfeed0802034131f3c801cb39a7cc816a66258))
* **pages:** navigate to index if fileKey param is invalid ([a136209](https://github.com/encrypit/encrypit/commit/a136209f93d0d4664285d421aa5b8d9a2913028a))
* **pages:** navigate to index on file delete in ShareLink ([fc4b968](https://github.com/encrypit/encrypit/commit/fc4b968e9d85eb07025427057355e5c645029aab))
* **pages:** navigate to InvalidLink if link is invalid in DownloadFile ([c886fe1](https://github.com/encrypit/encrypit/commit/c886fe14bd508171e71c1324cb398cf65f06e07f))
* **pages:** remove location hash in ConfirmDownload ([43d7859](https://github.com/encrypit/encrypit/commit/43d785978c0d36b202352ee92613f95e9d83f4fb))
* **pages:** render "Upload" button in UploadFile ([cf77230](https://github.com/encrypit/encrypit/commit/cf77230346b1e041111e52dd697780ededa4085d))
* **pages:** render deletion warning in Share ([ce15d3e](https://github.com/encrypit/encrypit/commit/ce15d3e02af433a0338c2b21be4c3245f3312e37))
* **pages:** render home link in DownloadFile ([73acd85](https://github.com/encrypit/encrypit/commit/73acd85a6a318750e027ea4c6b511772b7ef0c95))
* **pages:** render link in Share ([c721105](https://github.com/encrypit/encrypit/commit/c721105e98d0788cdbb1f7f55b9591b05011663d))
* **pages:** render paragraph in DownloadFile ([3aa39cd](https://github.com/encrypit/encrypit/commit/3aa39cd54d5ac2622e3f8cdeb44fe0df0bec592e))
* **pages:** render progressbar when loading in Download ([22ba459](https://github.com/encrypit/encrypit/commit/22ba459620e6dbfebe6bafae20e5564186575118))
* **pages:** replace placeholder text in Home ([b1feb8a](https://github.com/encrypit/encrypit/commit/b1feb8aec7d7c5a025e7e6623a0b010fd2b0deb9))
* **pages:** show DeleteDialog before deleting file in ShareLink ([992cece](https://github.com/encrypit/encrypit/commit/992cecee45ed8b7532ab4c6ecd5b0d0bd6cab3c6))
* **public:** replace favicon.ico, logo192.png, and logo512.png ([04df41c](https://github.com/encrypit/encrypit/commit/04df41cb8e6fdf5cf8739e9d7c56e70d8081da24))
* replace mui-template with encrypit ([2880bc1](https://github.com/encrypit/encrypit/commit/2880bc17f51b83feb28ff50b03afc3121ef182bc))
* **routes:** add NotFound ([3c6ebce](https://github.com/encrypit/encrypit/commit/3c6ebce30fac3a51360ffad0651c768c42f63044))
* **routes:** render Download ([d60616b](https://github.com/encrypit/encrypit/commit/d60616bae0c34eeab33a164b70a1e484172f840e))
* **routes:** render Share on path "/share" ([bb71ded](https://github.com/encrypit/encrypit/commit/bb71ded1ec95749631d2537b5b376fb388a8d8c6))
* **store:** create fileSlice ([1ee6a76](https://github.com/encrypit/encrypit/commit/1ee6a76d65b4a44892332fac87ea1deb8b56bd12))
* update app description ([cbaa6f9](https://github.com/encrypit/encrypit/commit/cbaa6f952e70a72d2737587f3909c519bf6b9005))
* upload and download zip file ([ab0c565](https://github.com/encrypit/encrypit/commit/ab0c565a7dfc54b2567e63733a34d0f872a57fea))
* **utils:** increase zip password length via key stretching ([c96e4a3](https://github.com/encrypit/encrypit/commit/c96e4a34638f30f95f5697f5b69e4c89dd1462fb))


### Bug Fixes

* **config:** default API_URL to '' ([2253ac5](https://github.com/encrypit/encrypit/commit/2253ac52c507ca75f2d8ace90257763c0c9658bf))
* **functions:** add property headers to util getResponseInit ([17f4ac7](https://github.com/encrypit/encrypit/commit/17f4ac70bacaecf0ffdb665d079c269b3ad9aff7))
* **functions:** respond with HTTP status code 411 for length required ([fed4cd1](https://github.com/encrypit/encrypit/commit/fed4cd1e2bff34d07576abb35dfe5aca708aac4d))
* **pages:** replace history for links in DownloadFile and ShareLink ([a08ff6b](https://github.com/encrypit/encrypit/commit/a08ff6bb0c52cfdd5f41f7127b4bab3a4ba425f2))
* **pages:** store file key in ConfirmDownload ([8697a60](https://github.com/encrypit/encrypit/commit/8697a60e29130ac4fb60df8675f5b404f8368334))
* **routes:** correct NotFound route path ([691a85d](https://github.com/encrypit/encrypit/commit/691a85dd750482816bf99201148c76abe6a962ac))
* **routes:** redirect to /404 instead of /invalid ([4af7de4](https://github.com/encrypit/encrypit/commit/4af7de46c1a1d8671ad0ac674d276c6268e8f6ca))
* **store:** set responseHandler for fileApi ([25b91ae](https://github.com/encrypit/encrypit/commit/25b91ae85dfcd2d6e64bfa46dcdfe61a8023f420))


### Performance Improvements

* **functions:** use stream instead of arrayBuffer ([005e2f5](https://github.com/encrypit/encrypit/commit/005e2f5afa429d4554b0e9a1ddbf8209472369fd))
* **pages:** lazy load ErrorBoundary ([50ee7f8](https://github.com/encrypit/encrypit/commit/50ee7f84632eef70603a26e0190c20c6b1a39328))
* **pages:** lazy load Home ([e3937b1](https://github.com/encrypit/encrypit/commit/e3937b138ed4faec6944a7cef5ed0b8345e81851))
