# Welcome QR Codes

Originally this was repo was intended as a product to be used in the tourism industry. With the advent of Covid, and it's sunsequent devastation of said industry, it has become a place to validate new dev ideas for usage in other current projects; Create-MEVN and Hue.

Live version of the master branch is pushed to (https://welcomeqr.codes) using a homegrown CD pipeline.

Things I'm experimenting with currently are ways to provide an more intuitive text editor UI to allow users to build websites using a GUI. Originally the focus of the product was to remove as many barriers to completion of said sites as possible, but this has lead me down a path of reconsidering how easy that process could actaully become.

I think providing a text editor-esk UI could actually be a useful tool for users that live on the verges of technical ability, where most of them would probably be accustomed to MS word or Google Docs, but might be aprehensive about their ability to use Wordpress or Shopify UI's.

Frontend: Vue with some Typescript, ideally there would be more, but until Vue 3 drops into production I think it might be a waste of valuable dev time.

Backend: ExpressJS/Typescript, MongoDB, Redis for session store.

Hosted on Digital Ocean.
