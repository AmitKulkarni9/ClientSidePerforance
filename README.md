# ClientSidePerformance

Introduction
Client/Browser Side Performance testing involves how the application performs when opened in a browser. For the user it means how long to wait to see the application is fully loaded and ready for interaction. According to a recent survey, a two-second threshold was set out. Any longer than 2 second and you are likely to lose your customer. So its extremely important to measure and test the page load time of application. 
“Page load time” depends on the static content loading of the page which contains Images and Stylesheets. And also on the network latency, ssl negotiations and client-side execution such as CSS and JS scripts.
To verify if an application is fast and efficient enough we do CLIENT-SIDE PERFORMANCE TESTS. This means checking the response time of a web application from the point of view of a single user. 

Solution
There are many open-source tools for client-side performance testing – WebPageTest, Google PageSpeed, Lighthouse, etc.

Webpagetest provides quick way by just specifying url. But not good if want to implement in CI/CD. Google PageSpeed is on similar lines as webpagetest.

Lighthouse is easy to understand and to implement in CI/CD. Lighthouse is an open-source, automated tool for improving the quality of web pages. Supports audits for performance, accessibility, progressive web apps, and more. 

Manual client-side performance testing
Lighthouse analyses web apps and web pages, collecting modern performance metrics and insights on developer best practices. Lighthouse is integrated directly into the Chrome Developer Tools, under the "Audits" panel. Select the Audits panel, and hit "Run audits". Performance report will be generated for the specified page.

Automated client-side performance testing
Lighthouse can
•	be installed by running 
npm install lighthouse 
•	run as a command line using the nodeJS
•	generate report by using lighthouse command and passing url for which client-side performance is to be carried out
Desktop
lighthouse https://www.example.com --only-categories=performance  --disable-device-emulation=true  --throttling-method=provided --output-path=output.html
Mobile
lighthouse https://www.example.com  --only-categories=performance  --throttling-method=provided --output-path= output.html
•	It takes various input parameters like performance for doing performance analysis, disable cpu & network throttling as we are interested in knowing the results for front-end responsive code. Specify the path where the report needs to be generated and type. By default its HTML. Supports JSON,CSV.
•	Network and CPU throttling are applied by default in a Lighthouse run. The network attempts to emulate slow 4G connectivity and the CPU is slowed down 4x from your machine's default speed. If you prefer to run Lighthouse without throttling, you'll have to use the CLI and disable it with the --throttling.* flags mentioned above (--throttling-method=provided).

Reporting

•	Lighthouse Performance report shows the passed audits and few improvements to do to meet those audits. 
•	Report covers Metrics for First Contentful Paint, Speed Index, Time to Interactive, First Meaningful Paint , Estimated Input Latency, etc. 
•	Report contains client side analysis of all aspects of performance – find bottlenecks, suggest system optimization and identifies risk related to client side performance. Such as reduce render-blocking scripts. (Script elements are blocking the first paint of your page. Consider inlining critical scripts and deferring non-critical ones.)

Authentication
As lighthouse takes URL as input parameter to launch and do performance analysis, it is not possible to use the pages which are behind authentication. 
The authenticated pages can be done by using debug port. Launch the URL using specific debug port (say for e.g. 9222) and login to page. This can be achieved by using puppeteer. After that use lighthouse command and launch URL by specifying same debug port as below:
lighthouse https://www.example.com/login  --port=9222 --only-categories=performance  --disable-device-emulation=true  --throttling-method=provided --output-path=output.html

