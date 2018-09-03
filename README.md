# SimpleOne
High imitation of Han Han's one client based on react-native
[中文文档][1]


current rendering：

 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone1.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone2.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone3.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone4.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone5.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone6.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone7.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone8.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone9.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone10.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone12.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone13.jpg?imageView2/2/w/500/h/500/q/100|imageslim)
 ![image](http://oqujmbgen.bkt.clouddn.com/simpleone14.jpg?imageView2/2/w/500/h/500/q/100|imageslim)

# how to run
Make sure that your compiled device and running device are on the same network, and configure Dev settings -> Debug server host & port for device
1. cd project root dir && Enter at the command line
- npm install --save (download dependencies)
- react-native start
2. compile
- command: gradle clean && gradle build
- android studio gradle plugin
3. select your running device && install app && run

# API list

Here is a record of the extracted API interface, I intend to learn and hope readers don't use these API in any commercial project, the currently listed interface is based on the Android version of 4.3.4：

1. one（first page,date=0,more page date=yyyy-MM-dd）

   `http://v3.wufazhuce.com:8000/api/channel/one/{date}/0`

2. topic list（first page，last_id=0，more page last_id=last request end_id）

   `http://v3.wufazhuce.com:8000/api/banner/list/4?last_id={last_id}`

3. horizontal list（Everyone asks everyone）

   `http://v3.wufazhuce.com:8000/api/banner/list/5`

4. Recent top authors

   `http://v3.wufazhuce.com:8000/api/author/hot`

5. home page menu jump
   - Question and answer
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/question/{content_id}`
     `http://v3.wufazhuce.com:8000/api/question/htmlcontent/{content_id}`

   - Serial
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/serial/{content_id}/0`
     `http://v3.wufazhuce.com:8000/api/serialcontent/htmlcontent/{content_id}`

   - Music
     `http://v3.wufazhuce.com:8000/api/music/htmlcontent/{content_id}`
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/music/{content_id}/0`

   - Movie
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/movie/{content_id}/0`
     `http://v3.wufazhuce.com:8000/api/movie/htmlcontent/{content_id}`

   - Content of the article and author
     `http://v3.wufazhuce.com:8000/api/essay/htmlcontent/{content_id}`
     article comment
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/essay/{content_id}/0`

6.  Search classification jump（category_id，0: Graphic 3: Question and answer 1: read 2: Serial 5: Movie 4: Music 8: Radio）

    `http://v3.wufazhuce.com:8000/api/all/list/{category_id}`

7.  homepage item and topic list item click the jump to show details and comments
   - Question and answer
     `http://v3.wufazhuce.com:8000/api/question/htmlcontent/{content_id}`
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/question/{content_id}`

   - Serial
     `http://v3.wufazhuce.com:8000/api/serialcontent/htmlcontent/{content_id}`
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/serial/{content_id}/0`

   - Music
     `http://v3.wufazhuce.com:8000/api/music/htmlcontent/{content_id}`
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/music/{content_id}/0`

   - Movie
     `http://v3.wufazhuce.com:8000/api/movie/htmlcontent/{content_id}`
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/movie/{content_id}/0`

   - Content of the article and author
     `http://v3.wufazhuce.com:8000/api/essay/htmlcontent/{content_id}`
   - article comment
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/essay/{content_id}/0`
   - Radio
     `http://v3.wufazhuce.com:8000/api/radio/htmlcontent/{content_id}`
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/radio/{content_id}/0`

   - Topic
     `http://v3.wufazhuce.com:8000/api/topic/htmlcontent/{content_id}`
     `http://v3.wufazhuce.com:8000/api/comment/praiseandtime/topic/{content_id}/0`

8. Author page
  `http://v3.wufazhuce.com:8000/api/author/works?page_num={page_num}&author_id={author_id}&version=4.3.4`

# feature list：

android 4.3.4：

one level ui：

welcome, Weekly display of different welcome screens

one is the homepage, Show today list（Graphic，one-story, Question and answer, Article, Movie, Music, Radio）, Collapse menu, Page down to view the previous list, Each page, view the contents of the previous day, the list header can be refreshed.

All paging, long list display, top banner, category navigation, topic list (down to the bottom, can be loaded more), the list header can be refreshed.

Me paging, profile page, when not logged in, login interface entry and setting entry

tow level ui：

setting

reading

login

share

search

Third-party platform sharing, login SDK docking

# technical points:

Most of the previous use of ES5, have now all been changed to ES6

React-native encapsulates native components.

1. Use of basic components View，Text，Image，ScrollView，ListView，WebView，Clipboard，Platform，TouchableOpacity，ActivityIndicator，StatusBar，SliderBar。
2. Use of Animation，Animated，Easing
3. Use of timer，react-timer-mixin
4. React-native call native module（native toast, call android Third-party platform sharing sdk）
5. Bottom TabNavigator，page Navigator
6. subcomponent encapsulates, call and callback
7. Passing parameters between parent and child components
8. Parameter transfer at page navigation jumps, and callbacks
9. Pull-down refresh, add third-party react-native-pulls, and partial modification
10. Custom folding component (menus in one paging)
11. Custom banner component, Implement the banner display in all paging
12. Custom load more component, listen to ScrollView Slide
13. Frame animation display during reading custom loading
14. Translucent UI, floating window, custom radio dialog
15. Photo album, camera implementation, react-native third-party library access
16. Call component based on Android native
17. Integrate react-native framework for hybrid development based on Android native projects
18. Music album cover rotation animation (solves pause and play events in animated loops), improves frame performance by directly modifying the property
19. Measure page height adaptation webview display by inject javascript
20. Add react-mobx to realize multiple page refresh at the same time (2018.5.2 update)
21. Use high-order-component realize base component for the common logic of the component (2018.5.2 update)
22. Add animation for refresh date when scroll page on one page's title (2018.6.28 update)
23. Modify the web page style in the webview to implement night mode by inject javascript (2018.7.18 update)
24. update loadMore Prompt status (2018.9.3 update)
25. fix bug of the sliding conflict of scrollview nesting (2018.9.3 update)
[1]: https://github.com/jessieeeee/SimpleOne/blob/master/README_zh.md