(this.webpackJsonp=this.webpackJsonp||[]).push([["dne-custom-css-js"],{"/3Mh":function(e){e.exports=JSON.parse('{"dne-customcssjs":{"modules":{"menu":"Custom CSS/JS","title":"CSS/JS Container","addModulesButton":"Add Container","nameLabel":"Name","cssLabel":"CSS/SCSS","jsLabel":"JavaScript","activeLabel":"Active","saveButton":"Save","saveCompileButton":"Save & Compile","cancelButton":"Cancel","donateText":"Click here to support this free extension or if you want to buy me a cup of coffee","credit":"David Neustadt - kontakt@davidneustadt.de - https://neustadt.dev"}}}')},"380L":function(e){e.exports=JSON.parse('{"dne-customcssjs":{"modules":{"menu":"Custom CSS/JS","title":"CSS/JS Container","addModulesButton":"Container hinzufügen","nameLabel":"Name","cssLabel":"CSS/SCSS","jsLabel":"JavaScript","activeLabel":"Aktiv","saveButton":"Speichern","saveCompileButton":"Speichern & Kompilieren","cancelButton":"Abbrechen","donateText":"Klicken Sie hier, wenn Sie dieses kostenlose Plugin unterstützen oder mir einen Kaffee ausgeben möchten","credit":"David Neustadt - kontakt@davidneustadt.de - https://neustadt.dev"}}}')},"J2v/":function(e,t,o){"use strict";(function(e){var t=o("Zc3j"),n=o.n(t);o("Z/Zz");const{Component:i,Mixin:r,Filter:a}=Shopware,{mapPropertyErrors:s}=Shopware.Component.getComponentHelper();i.register("dne-module-detail",{template:n(),inject:["repositoryFactory","context"],mixins:[r.getByName("notification")],metaInfo(){return{title:this.$createTitle()}},data:()=>({syncService:null,httpClient:null,module:null,isLoading:!1,processSuccess:!1,repository:null}),props:{moduleId:{type:String,required:!1,default:null}},computed:{editorConfigJs:()=>({mode:"ace/mode/javascript"}),editorConfigSass:()=>({mode:"ace/mode/scss"}),...s("module",["name"])},created(){this.repository=this.repositoryFactory.create("dne_custom_js_css"),this.getModule(),this.syncService=Shopware.Service("syncService"),this.httpClient=this.syncService.httpClient},methods:{getModule(){this.moduleId?this.repository.get(this.moduleId,Shopware.Context.api).then((e=>{this.module=e})):this.module=this.repository.create(Shopware.Context.api)},onClickSave(){return this.isLoading=!0,this.repository.save(this.module,Shopware.Context.api).then((()=>{this.moduleId||(this.moduleId=this.module.id),this.getModule(),this.isLoading=!1,this.processSuccess=!0})).catch((t=>{this.isLoading=!1,e.name&&e.name.length&&this.createNotificationError({title:"Error",message:t})}))},onClickSaveCompile(){this.onClickSave().then((()=>{this.isLoading=!0;const e={Authorization:`Bearer ${Shopware.Context.api.authToken.access}`,"Content-Type":"application/json"};this.httpClient.get("_action/dne-customcssjs/compile",{headers:e}).then((()=>{this.isLoading=!1})).catch((e=>{this.isLoading=!1;try{this.createNotificationError({title:e.response.data.errors[0].title,message:a.getByName("truncate")(e.response.data.errors[0].detail,300),autoClose:!1})}catch(t){this.createNotificationError({title:e.title,message:e.message,autoClose:!1})}}))}))},saveFinish(){this.processSuccess=!1}}})}).call(this,o("3UD+")(e))},"Z/Zz":function(e,t,o){(function(e){ace.define("ace/mode/css_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],(function(e,t,o){"use strict";var n=e("../lib/oop"),i=(e("../lib/lang"),e("./text_highlight_rules").TextHighlightRules),r=t.supportType="align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|border|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-shadow|box-sizing|caption-side|clear|clip|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|hanging-punctuation|height|justify-content|left|letter-spacing|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|max-height|max-width|max-zoom|min-height|min-width|min-zoom|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|order|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-x|overflow-y|padding|padding-bottom|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|perspective|perspective-origin|position|quotes|resize|right|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-indent|text-justify|text-overflow|text-shadow|text-transform|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|user-select|user-zoom|vertical-align|visibility|white-space|width|word-break|word-spacing|word-wrap|z-index",a=t.supportFunction="rgb|rgba|url|attr|counter|counters",s=t.supportConstant="absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero|zoom",l=t.supportConstantColor="aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",c=t.supportConstantFonts="arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace",d=t.numRe="\\-?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))",u=t.pseudoElements="(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",p=t.pseudoClasses="(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",m=function(){var e=this.createKeywordMapper({"support.function":a,"support.constant":s,"support.type":r,"support.constant.color":l,"support.constant.fonts":c},"text",!0);this.$rules={start:[{include:["strings","url","comments"]},{token:"paren.lparen",regex:"\\{",next:"ruleset"},{token:"paren.rparen",regex:"\\}"},{token:"string",regex:"@(?!viewport)",next:"media"},{token:"keyword",regex:"#[a-z0-9-_]+"},{token:"keyword",regex:"%"},{token:"variable",regex:"\\.[a-z0-9-_]+"},{token:"string",regex:":[a-z0-9-_]+"},{token:"constant.numeric",regex:d},{token:"constant",regex:"[a-z0-9-_]+"},{caseInsensitive:!0}],media:[{include:["strings","url","comments"]},{token:"paren.lparen",regex:"\\{",next:"start"},{token:"paren.rparen",regex:"\\}",next:"start"},{token:"string",regex:";",next:"start"},{token:"keyword",regex:"(?:media|supports|document|charset|import|namespace|media|supports|document|page|font|keyframes|viewport|counter-style|font-feature-values|swash|ornaments|annotation|stylistic|styleset|character-variant)"}],comments:[{token:"comment",regex:"\\/\\*",push:[{token:"comment",regex:"\\*\\/",next:"pop"},{defaultToken:"comment"}]}],ruleset:[{regex:"-(webkit|ms|moz|o)-",token:"text"},{token:"punctuation.operator",regex:"[:;]"},{token:"paren.rparen",regex:"\\}",next:"start"},{include:["strings","url","comments"]},{token:["constant.numeric","keyword"],regex:"("+d+")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)"},{token:"constant.numeric",regex:d},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:["punctuation","entity.other.attribute-name.pseudo-element.css"],regex:u},{token:["punctuation","entity.other.attribute-name.pseudo-class.css"],regex:p},{include:"url"},{token:e,regex:"\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"},{caseInsensitive:!0}],url:[{token:"support.function",regex:"(?:url(:?-prefix)?|domain|regexp)\\(",push:[{token:"support.function",regex:"\\)",next:"pop"},{defaultToken:"string"}]}],strings:[{token:"string.start",regex:"'",push:[{token:"string.end",regex:"'|$",next:"pop"},{include:"escapes"},{token:"constant.language.escape",regex:/\\$/,consumeLineEnd:!0},{defaultToken:"string"}]},{token:"string.start",regex:'"',push:[{token:"string.end",regex:'"|$',next:"pop"},{include:"escapes"},{token:"constant.language.escape",regex:/\\$/,consumeLineEnd:!0},{defaultToken:"string"}]}],escapes:[{token:"constant.language.escape",regex:/\\([a-fA-F\d]{1,6}|[^a-fA-F\d])/}]},this.normalizeRules()};n.inherits(m,i),t.CssHighlightRules=m})),ace.define("ace/mode/scss_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules","ace/mode/css_highlight_rules"],(function(e,t,o){"use strict";var n=e("../lib/oop"),i=e("../lib/lang"),r=e("./text_highlight_rules").TextHighlightRules,a=e("./css_highlight_rules"),s=function(){var e=i.arrayToMap(a.supportType.split("|")),t=i.arrayToMap("hsl|hsla|rgb|rgba|url|attr|counter|counters|abs|adjust_color|adjust_hue|alpha|join|blue|ceil|change_color|comparable|complement|darken|desaturate|floor|grayscale|green|hue|if|invert|join|length|lighten|lightness|mix|nth|opacify|opacity|percentage|quote|red|round|saturate|saturation|scale_color|transparentize|type_of|unit|unitless|unquote".split("|")),o=i.arrayToMap(a.supportConstant.split("|")),n=i.arrayToMap(a.supportConstantColor.split("|")),r=i.arrayToMap("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|def|end|declare".split("|")),s=i.arrayToMap("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp".split("|")),l="\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:l+"(?:ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)"},{token:"constant.numeric",regex:"#[a-f0-9]{6}"},{token:"constant.numeric",regex:"#[a-f0-9]{3}"},{token:"constant.numeric",regex:l},{token:["support.function","string","support.function"],regex:"(url\\()(.*)(\\))"},{token:function(i){return e.hasOwnProperty(i.toLowerCase())?"support.type":r.hasOwnProperty(i)?"keyword":o.hasOwnProperty(i)?"constant.language":t.hasOwnProperty(i)?"support.function":n.hasOwnProperty(i.toLowerCase())?"support.constant.color":s.hasOwnProperty(i.toLowerCase())?"variable.language":"text"},regex:"\\-?[@a-z_][@a-z0-9_\\-]*"},{token:"variable",regex:"[a-z_\\-$][a-z0-9_\\-$]*\\b"},{token:"variable.language",regex:"#[a-z0-9-_]+"},{token:"variable.language",regex:"\\.[a-z0-9-_]+"},{token:"variable.language",regex:":[a-z0-9-_]+"},{token:"constant",regex:"[a-z0-9-_]+"},{token:"keyword.operator",regex:"<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"},{caseInsensitive:!0}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}]}};n.inherits(s,r),t.ScssHighlightRules=s})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(e,t,o){"use strict";var n=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var o=e.getLine(t).match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,r=e.findMatchingBracket({row:t,column:i});if(!r||r.row==t)return 0;var a=this.$getIndent(e.getLine(r.row));e.replace(new n(t,0,t,i-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i})),ace.define("ace/mode/behaviour/css",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],(function(e,t,o){"use strict";var n=e("../../lib/oop"),i=(e("../behaviour").Behaviour,e("./cstyle").CstyleBehaviour),r=e("../../token_iterator").TokenIterator,a=function(){this.inherit(i),this.add("colon","insertion",(function(e,t,o,n,i){if(":"===i&&o.selection.isEmpty()){var a=o.getCursorPosition(),s=new r(n,a.row,a.column),l=s.getCurrentToken();if(l&&l.value.match(/\s+/)&&(l=s.stepBackward()),l&&"support.type"===l.type){var c=n.doc.getLine(a.row);if(":"===c.substring(a.column,a.column+1))return{text:"",selection:[1,1]};if(/^(\s+[^;]|\s*$)/.test(c.substring(a.column)))return{text:":;",selection:[1,1]}}}})),this.add("colon","deletion",(function(e,t,o,n,i){var a=n.doc.getTextRange(i);if(!i.isMultiLine()&&":"===a){var s=o.getCursorPosition(),l=new r(n,s.row,s.column),c=l.getCurrentToken();if(c&&c.value.match(/\s+/)&&(c=l.stepBackward()),c&&"support.type"===c.type)if(";"===n.doc.getLine(i.start.row).substring(i.end.column,i.end.column+1))return i.end.column++,i}})),this.add("semicolon","insertion",(function(e,t,o,n,i){if(";"===i&&o.selection.isEmpty()){var r=o.getCursorPosition();if(";"===n.doc.getLine(r.row).substring(r.column,r.column+1))return{text:"",selection:[1,1]}}})),this.add("!important","insertion",(function(e,t,o,n,i){if("!"===i&&o.selection.isEmpty()){var r=o.getCursorPosition(),a=n.doc.getLine(r.row);if(/^\s*(;|}|$)/.test(a.substring(r.column)))return{text:"!important",selection:[10,10]}}}))};n.inherits(a,i),t.CssBehaviour=a})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(e,t,o){"use strict";var n=e("../../lib/oop"),i=e("../../range").Range,r=e("./fold_mode").FoldMode,a=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(a,r),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,o){var n=e.getLine(o);if(this.singleLineBlockCommentRe.test(n)&&!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return"";var i=this._getFoldWidgetBase(e,t,o);return!i&&this.startRegionRe.test(n)?"start":i},this.getFoldWidgetRange=function(e,t,o,n){var i,r=e.getLine(o);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,o);if(i=r.match(this.foldingStartMarker)){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],o,a);var s=e.getCommentFoldRange(o,a+i[0].length,1);return s&&!s.isMultiLine()&&(n?s=this.getSectionRange(e,o):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(i=r.match(this.foldingStopMarker))){a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],o,a):e.getCommentFoldRange(o,a,-1)}},this.getSectionRange=function(e,t){for(var o=e.getLine(t),n=o.search(/\S/),r=t,a=o.length,s=t+=1,l=e.getLength();++t<l;){var c=(o=e.getLine(t)).search(/\S/);if(-1!==c){if(n>c)break;var d=this.getFoldWidgetRange(e,"all",t);if(d){if(d.start.row<=r)break;if(d.isMultiLine())t=d.end.row;else if(n==c)break}s=t}}return new i(r,a,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,o){for(var n=t.search(/\s*$/),r=e.getLength(),a=o,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++o<r;){t=e.getLine(o);var c=s.exec(t);if(c&&(c[1]?l--:l++,!l))break}if(o>a)return new i(a,n,o,t.length)}}.call(a.prototype)})),ace.define("ace/mode/css_completions",["require","exports","module"],(function(e,t,o){"use strict";var n={background:{"#$0":1},"background-color":{"#$0":1,transparent:1,fixed:1},"background-image":{"url('/$0')":1},"background-repeat":{repeat:1,"repeat-x":1,"repeat-y":1,"no-repeat":1,inherit:1},"background-position":{bottom:2,center:2,left:2,right:2,top:2,inherit:2},"background-attachment":{scroll:1,fixed:1},"background-size":{cover:1,contain:1},"background-clip":{"border-box":1,"padding-box":1,"content-box":1},"background-origin":{"border-box":1,"padding-box":1,"content-box":1},border:{"solid $0":1,"dashed $0":1,"dotted $0":1,"#$0":1},"border-color":{"#$0":1},"border-style":{solid:2,dashed:2,dotted:2,double:2,groove:2,hidden:2,inherit:2,inset:2,none:2,outset:2,ridged:2},"border-collapse":{collapse:1,separate:1},bottom:{px:1,em:1,"%":1},clear:{left:1,right:1,both:1,none:1},color:{"#$0":1,"rgb(#$00,0,0)":1},cursor:{default:1,pointer:1,move:1,text:1,wait:1,help:1,progress:1,"n-resize":1,"ne-resize":1,"e-resize":1,"se-resize":1,"s-resize":1,"sw-resize":1,"w-resize":1,"nw-resize":1},display:{none:1,block:1,inline:1,"inline-block":1,"table-cell":1},"empty-cells":{show:1,hide:1},float:{left:1,right:1,none:1},"font-family":{Arial:2,"Comic Sans MS":2,Consolas:2,"Courier New":2,Courier:2,Georgia:2,Monospace:2,"Sans-Serif":2,"Segoe UI":2,Tahoma:2,"Times New Roman":2,"Trebuchet MS":2,Verdana:1},"font-size":{px:1,em:1,"%":1},"font-weight":{bold:1,normal:1},"font-style":{italic:1,normal:1},"font-variant":{normal:1,"small-caps":1},height:{px:1,em:1,"%":1},left:{px:1,em:1,"%":1},"letter-spacing":{normal:1},"line-height":{normal:1},"list-style-type":{none:1,disc:1,circle:1,square:1,decimal:1,"decimal-leading-zero":1,"lower-roman":1,"upper-roman":1,"lower-greek":1,"lower-latin":1,"upper-latin":1,georgian:1,"lower-alpha":1,"upper-alpha":1},margin:{px:1,em:1,"%":1},"margin-right":{px:1,em:1,"%":1},"margin-left":{px:1,em:1,"%":1},"margin-top":{px:1,em:1,"%":1},"margin-bottom":{px:1,em:1,"%":1},"max-height":{px:1,em:1,"%":1},"max-width":{px:1,em:1,"%":1},"min-height":{px:1,em:1,"%":1},"min-width":{px:1,em:1,"%":1},overflow:{hidden:1,visible:1,auto:1,scroll:1},"overflow-x":{hidden:1,visible:1,auto:1,scroll:1},"overflow-y":{hidden:1,visible:1,auto:1,scroll:1},padding:{px:1,em:1,"%":1},"padding-top":{px:1,em:1,"%":1},"padding-right":{px:1,em:1,"%":1},"padding-bottom":{px:1,em:1,"%":1},"padding-left":{px:1,em:1,"%":1},"page-break-after":{auto:1,always:1,avoid:1,left:1,right:1},"page-break-before":{auto:1,always:1,avoid:1,left:1,right:1},position:{absolute:1,relative:1,fixed:1,static:1},right:{px:1,em:1,"%":1},"table-layout":{fixed:1,auto:1},"text-decoration":{none:1,underline:1,"line-through":1,blink:1},"text-align":{left:1,right:1,center:1,justify:1},"text-transform":{capitalize:1,uppercase:1,lowercase:1,none:1},top:{px:1,em:1,"%":1},"vertical-align":{top:1,bottom:1},visibility:{hidden:1,visible:1},"white-space":{nowrap:1,normal:1,pre:1,"pre-line":1,"pre-wrap":1},width:{px:1,em:1,"%":1},"word-spacing":{normal:1},filter:{"alpha(opacity=$0100)":1},"text-shadow":{"$02px 2px 2px #777":1},"text-overflow":{"ellipsis-word":1,clip:1,ellipsis:1},"-moz-border-radius":1,"-moz-border-radius-topright":1,"-moz-border-radius-bottomright":1,"-moz-border-radius-topleft":1,"-moz-border-radius-bottomleft":1,"-webkit-border-radius":1,"-webkit-border-top-right-radius":1,"-webkit-border-top-left-radius":1,"-webkit-border-bottom-right-radius":1,"-webkit-border-bottom-left-radius":1,"-moz-box-shadow":1,"-webkit-box-shadow":1,transform:{"rotate($00deg)":1,"skew($00deg)":1},"-moz-transform":{"rotate($00deg)":1,"skew($00deg)":1},"-webkit-transform":{"rotate($00deg)":1,"skew($00deg)":1}},i=function(){};(function(){this.completionsDefined=!1,this.defineCompletions=function(){if(document){var e=document.createElement("c").style;for(var t in e)if("string"==typeof e[t]){var o=t.replace(/[A-Z]/g,(function(e){return"-"+e.toLowerCase()}));n.hasOwnProperty(o)||(n[o]=1)}}this.completionsDefined=!0},this.getCompletions=function(e,t,o,n){if(this.completionsDefined||this.defineCompletions(),"ruleset"===e||"ace/mode/scss"==t.$mode.$id){var i=t.getLine(o.row).substr(0,o.column);return/:[^;]+$/.test(i)?(/([\w\-]+):[^:]*$/.test(i),this.getPropertyValueCompletions(e,t,o,n)):this.getPropertyCompletions(e,t,o,n)}return[]},this.getPropertyCompletions=function(e,t,o,i){return Object.keys(n).map((function(e){return{caption:e,snippet:e+": $0;",meta:"property",score:1e6}}))},this.getPropertyValueCompletions=function(e,t,o,i){var r=t.getLine(o.row).substr(0,o.column),a=(/([\w\-]+):[^:]*$/.exec(r)||{})[1];if(!a)return[];var s=[];return a in n&&"object"==typeof n[a]&&(s=Object.keys(n[a])),s.map((function(e){return{caption:e,snippet:e,meta:"property value",score:1e6}}))}}).call(i.prototype),t.CssCompletions=i})),ace.define("ace/mode/scss",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/scss_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/css","ace/mode/folding/cstyle","ace/mode/css_completions"],(function(e,t,o){"use strict";var n=e("../lib/oop"),i=e("./text").Mode,r=e("./scss_highlight_rules").ScssHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,s=e("./behaviour/css").CssBehaviour,l=e("./folding/cstyle").FoldMode,c=e("./css_completions").CssCompletions,d=function(){this.HighlightRules=r,this.$outdent=new a,this.$behaviour=new s,this.$completer=new c,this.foldingRules=new l};n.inherits(d,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,o){var n=this.$getIndent(t),i=this.getTokenizer().getLineTokens(t,e).tokens;return i.length&&"comment"==i[i.length-1].type||t.match(/^.*\{\s*$/)&&(n+=o),n},this.checkOutdent=function(e,t,o){return this.$outdent.checkOutdent(t,o)},this.autoOutdent=function(e,t,o){this.$outdent.autoOutdent(t,o)},this.getCompletions=function(e,t,o,n){return this.$completer.getCompletions(e,t,o,n)},this.$id="ace/mode/scss"}.call(d.prototype),t.Mode=d})),ace.require(["ace/mode/scss"],(function(t){e&&(e.exports=t)}))}).call(this,o("YuTi")(e))},Zc3j:function(e,t){e.exports='{% block dne_module_detail %}\n    <sw-page class="dne-module-detail">\n        <template slot="smart-bar-actions">\n            <sw-button :routerLink="{ name: \'dne.module.list\' }">\n                {{ $t(\'dne-customcssjs.modules.cancelButton\') }}\n            </sw-button>\n\n            <sw-button-process\n                    :isLoading="isLoading"\n                    :processSuccess="processSuccess"\n                    variant="primary"\n                    @process-finish="saveFinish"\n                    @click="onClickSave">\n                {{ $t(\'dne-customcssjs.modules.saveButton\') }}\n            </sw-button-process>\n\n            <sw-button-process\n                :isLoading="isLoading"\n                :processSuccess="processSuccess"\n                variant="primary"\n                @process-finish="saveFinish"\n                @click="onClickSaveCompile">\n                {{ $t(\'dne-customcssjs.modules.saveCompileButton\') }}\n            </sw-button-process>\n        </template>\n\n        <template slot="content">\n            <sw-card-view>\n                <sw-card v-if="module" :isLoading="isLoading">\n                    <sw-checkbox-field :label="$t(\'dne-customcssjs.modules.activeLabel\')" v-model="module.active"></sw-checkbox-field>\n\n                    <sw-field type="text"\n                              :label="$t(\'dne-customcssjs.modules.nameLabel\')"\n                              v-model="module.name"\n                              validation="required"\n                              :error="moduleNameError"\n                              required>\n                    </sw-field>\n\n                    <sw-code-editor\n                        :label="$t(\'dne-customcssjs.modules.cssLabel\')"\n                        name="css"\n                        identifier="value"\n                        completionMode="entity"\n                        :editorConfig="editorConfigSass"\n                        v-model="module.css">\n                    </sw-code-editor>\n\n                    <sw-code-editor\n                        :label="$t(\'dne-customcssjs.modules.jsLabel\')"\n                        name="js"\n                        identifier="value"\n                        completionMode="entity"\n                        :editorConfig="editorConfigJs"\n                        v-model="module.js">\n                    </sw-code-editor>\n                </sw-card>\n                <sw-card>\n                    <a href="https://github.com/dneustadt/DneCustomCssJs" target="_blank" rel="noopener">\n                        {{ $t(\'dne-customcssjs.modules.donateText\') }}\n                    </a>\n                    <p>{{ $t(\'dne-customcssjs.modules.credit\') }}</p>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}\n'},j7kl:function(e,t){e.exports='{% block dne_module_list %}\n    <sw-page class="dne-module-list">\n        {% block dne_module_list_smart_bar_actions %}\n            <template slot="smart-bar-actions">\n                <sw-button variant="primary" :routerLink="{ name: \'dne.module.create\' }">\n                    {{ $t(\'dne-customcssjs.modules.addModulesButton\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        <template slot="content">\n            {% block dne_module_list_content %}\n                <sw-entity-listing\n                        v-if="modules"\n                        ref="listing"\n                        :items="modules"\n                        :repository="repository"\n                        :showSelection="false"\n                        :columns="columns"\n                        detailRoute="dne.module.detail">\n                </sw-entity-listing>\n                <div\n                        v-if="isLoading"\n                        class="sw-overlay">\n                    <sw-loader></sw-loader>\n                </div>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}\n'},jIcv:function(e,t,o){"use strict";o.r(t);var n=o("j7kl"),i=o.n(n);const{Component:r}=Shopware,{Criteria:a}=Shopware.Data;r.register("dne-module-list",{template:i.a,inject:["repositoryFactory","context"],data:()=>({repository:null,modules:null,isLoading:!0}),metaInfo(){return{title:this.$createTitle()}},computed:{columns(){return[{property:"name",dataIndex:"name",label:this.$t("dne-customcssjs.modules.nameLabel"),routerLink:"dne.module.detail",inlineEdit:"string",allowResize:!0,primary:!0}]}},created(){this.repository=this.repositoryFactory.create("dne_custom_js_css");const e=Shopware.Service("syncService").httpClient,t={Authorization:`Bearer ${Shopware.Context.api.authToken.access}`,"Content-Type":"application/json"};this.repository.search(new a,Shopware.Context.api).then((o=>{this.modules=o,this.isLoading=!1,this.$nextTick().then((()=>{this.$refs.listing.$on("delete-item-finish",(()=>{this.isLoading=!0,e.get("_action/dne-customcssjs/compile",{headers:t}).then((()=>{this.isLoading=!1})).catch((()=>{this.isLoading=!1}))}))}))}))}});o("J2v/");var s=o("380L"),l=o("/3Mh");const{Module:c}=Shopware;c.register("dne-module",{color:"#ff3d58",icon:"default-text-code",title:"dne-customcssjs.modules.title",description:"",snippets:{"de-DE":s,"en-GB":l},routes:{list:{component:"dne-module-list",path:"list"},detail:{component:"dne-module-detail",path:"detail/:id",meta:{parentPath:"dne.module.list"},props:{default:e=>({moduleId:e.params.id})}},create:{component:"dne-module-detail",path:"create",meta:{parentPath:"dne.module.list"}}},navigation:[{label:"dne-customcssjs.modules.menu",path:"dne.module.list",parent:"sw-settings",position:100}]})}},[["jIcv","runtime","vendors-node"]]]);