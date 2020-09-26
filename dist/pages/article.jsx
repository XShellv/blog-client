"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("@/components/Comment"));
const Layout_tsx_1 = __importDefault(require("@/layout/Layout.tsx"));
const CustomTag_1 = __importDefault(require("@/components/CustomTag"));
const api_1 = __importDefault(require("../lib/api"));
const react_1 = __importStar(require("react"));
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const moment_1 = __importDefault(require("moment"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const antd_1 = require("antd");
const pages_1 = require("pages");
const PageLoading_1 = __importDefault(require("@/components/PageLoading"));
const VditorMd = dynamic_1.default(() => Promise.resolve().then(() => __importStar(require("@/components/VditorMd"))), {
    ssr: false,
    loading: () => <PageLoading_1.default />,
});
const Article = ({ post }) => {
    react_1.useEffect(() => { }, []);
    return (<div id="article-wrapper">
      <head_1.default>
        <title>{post.title}</title>
        <meta property="og:title" content="My page title" key="article"/>
        <script src="/static/js/prism.js"></script>
      </head_1.default>

      <Layout_tsx_1.default>
        <antd_1.Card bordered={false}>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-info">
            <div className="tags">
              {post.tags.map((tag) => (<CustomTag_1.default key={tag.name}>{tag.name}</CustomTag_1.default>))}
            </div>
            <div className="extra">
              <span className="time">
                发布于：
                {moment_1.default(new Date(post.updatedAt).valueOf()).format(pages_1.dateFormat)}
              </span>
            </div>
          </div>
          <div className="article-header" style={{
        backgroundImage: `url(${post.post})`,
    }}></div>

          <div className="article-content" style={{ position: "relative" }}>
            <VditorMd content={post.content}/>
            <div className="article-toc"></div>
          </div>
          <div className="article-nav">
            {post.prev && (<link_1.default href={`/article/${post.prev}`}>
                <a className="left">
                  <i className="iconfont">&#xe607;</i>
                  <span>{post.prev}</span>
                </a>
              </link_1.default>)}
            {post.next && (<link_1.default href={`/article/${post.next}`}>
                <a className="right">
                  <span>{post.next}</span>
                  <i className="iconfont">&#xe606;</i>
                </a>
              </link_1.default>)}
          </div>
        </antd_1.Card>
        <antd_1.Card bordered={false}>
          <Comment_1.default />
        </antd_1.Card>
        <antd_1.BackTop />
      </Layout_tsx_1.default>
    </div>);
};
// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }
Article.getInitialProps = async (ctx) => {
    const { req, query } = ctx;
    const resp = await api_1.default.request({ url: `/post/${query.id}` });
    return {
        post: resp.data.data,
    };
};
exports.default = Article;
//# sourceMappingURL=article.jsx.map