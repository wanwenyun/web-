export default {
  title: "弯弯个人小站",
  description: "万雯赟小站",
  themeConfig: {
    logo: "/images/logo.png",
    nav: [
      { text: "个人简历", link: "/guide" },
      {
        text: "学习小记",
        items: [
          { text: "JS基础", link: "/JavaScript基础/js原型(原型链)、作用域、this、执行上下文、闭包.md" },
          { text: "Google V8", link: "/Google V8/V8(1) - 变量提升，作用域、内存管理机制、闭包、如何执行JS代码.md" },
          { text: "浏览器", link: "/浏览器/宏观(1)-多进程架构、从输入URL到展示.md" },
          { text: "前端框架", link: "/前端框架/React/React核心原理/React核心原理1-理念(React15、fiber架构).md" },
          { text: "LC刷题笔记", link: "/算法/动态规划/120.三角形最小路径和.md" },
          { text: "工程化", link: "/工程化/Webpack-学习笔记.md" },
          { text: "其他", link: "/其他/浏览器跨域、网络安全、攻击防范.md" },
        ],
      },
      { text: "团队成员", link: "/team" },
    ],
    sidebar: {
      "/JavaScript基础": [
          {
              "text": "call、apply、bind、new",
              "link": "/JavaScript基础/call、apply、bind、new.md"
          },
          {
              "text": "es6新特性",
              "link": "/JavaScript基础/es6新特性.md"
          },
          {
              "text": "js原型(原型链)、作用域、this、执行上下文、闭包",
              "link": "/JavaScript基础/js原型(原型链)、作用域、this、执行上下文、闭包.md"
          },
          {
              "text": "js奇技淫巧",
              "link": "/JavaScript基础/js奇技淫巧.md"
          },
          {
              "text": "js类型判断、类型转换(隐式、强制(显式))",
              "link": "/JavaScript基础/js类型判断、类型转换(隐式、强制(显式)).md"
          },
          {
              "text": "创建对象、继承",
              "link": "/JavaScript基础/创建对象、继承.md"
          },
          {
              "text": "异步编程(promise、generator、async,await)",
              "link": "/JavaScript基础/异步编程(promise、generator、async,await).md"
          },
          {
              "text": "深浅拷贝",
              "link": "/JavaScript基础/深浅拷贝.md"
          },
          {
              "text": "防抖、节流",
              "link": "/JavaScript基础/防抖、节流.md"
          }
      ],
      "/Google V8": [
          {
              "text": "V8(1) - 变量提升，作用域、内存管理机制、闭包、如何执行JS代码",
              "link": "/Google V8/V8(1) - 变量提升，作用域、内存管理机制、闭包、如何执行JS代码.md"
          },
          {
              "text": "V8(2) - 事件循环机制",
              "link": "/Google V8/V8(2) - 事件循环机制.md"
          },
          {
              "text": "V8(3) - 垃圾回收机制，内存泄露",
              "link": "/Google V8/V8(3) - 垃圾回收机制，内存泄露.md"
          }
      ],
      "/浏览器": [
          {
              "text": "web API-XMLHttpRequest，及ajax,axios,fetch之间的区别",
              "link": "/浏览器/web API-XMLHttpRequest，及ajax,axios,fetch之间的区别.md"
          },
          {
              "text": "存储-cookie、localStorage、sessionStorage、登陆保持",
              "link": "/浏览器/存储-cookie、localStorage、sessionStorage、登陆保持.md"
          },
          {
              "text": "安全-系统安全(安全沙箱，站点隔离)、网络安全(https)",
              "link": "/浏览器/安全-系统安全(安全沙箱，站点隔离)、网络安全(https).md"
          },
          {
              "text": "安全-页面安全(跨域，网站攻击)",
              "link": "/浏览器/安全-页面安全(跨域，网站攻击).md"
          },
          {
              "text": "宏观(1)-多进程架构、从输入URL到展示",
              "link": "/浏览器/宏观(1)-多进程架构、从输入URL到展示.md"
          },
          {
              "text": "宏观(2)-渲染流程",
              "link": "/浏览器/宏观(2)-渲染流程.md"
          },
          {
              "text": "缓存-DNS、CDN",
              "link": "/浏览器/缓存-DNS、CDN.md"
          },
          {
              "text": "缓存-浏览器(http)缓存(强缓存，协商缓存)",
              "link": "/浏览器/缓存-浏览器(http)缓存(强缓存，协商缓存).md"
          },
          {
              "text": "网络(1)-TCP协议，DNS解析(域名解析)",
              "link": "/浏览器/网络(1)-TCP协议，DNS解析(域名解析).md"
          },
          {
              "text": "网络(2)-http1、2、3",
              "link": "/浏览器/网络(2)-http1、2、3.md"
          },
          {
              "text": "网络(3)-https",
              "link": "/浏览器/网络(3)-https.md"
          },
          {
              "text": "网络(4)-http协议相关知识",
              "link": "/浏览器/网络(4)-http协议相关知识.md"
          }
      ],
      "/前端框架": [
          {
              "text": "React",
              "collapsible": true,
              "collapsed": false,
              "items": [
                  {
                      "text": "React核心原理",
                      "collapsible": true,
                      "collapsed": false,
                      "items": [
                          {
                              "text": "1-理念(React15、fiber架构)",
                              "link": "/前端框架/React/React核心原理/React核心原理1-理念(React15、fiber架构).md"
                          },
                          {
                              "text": "2-架构(render,commit阶段，生命周期)",
                              "link": "/前端框架/React/React核心原理/React核心原理2-架构(render,commit阶段，生命周期).md"
                          },
                          {
                              "text": "3-diff",
                              "link": "/前端框架/React/React核心原理/React核心原理2-diff.md"
                          },
                          {
                              "text": "4-状态更新",
                              "link": "/前端框架/React/React核心原理/React核心原理3-状态更新.md"
                          },
                          {
                              "text": "5-Hooks",
                              "link": "/前端框架/React/React核心原理/React核心原理4-Hooks.md"
                          },
                          {
                              "text": "6-Concurrent-Mode",
                              "link": "/前端框架/React/React核心原理/React核心原理5-Concurrent-Mode.md"
                          },
                      ]
                  },
                  {
                      "text": "状态管理",
                      "link": "/前端框架/React/状态管理-redux,useReducer+useContext,unstated-next.md"
                  },
              ]
          },
          {
              "text": "Vue",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "vue响应式原理",
                      "link": "/前端框架/Vue/vue响应式原理.md"
                  }
              ]
          },
          {
              "text": "react与vue",
              "link": "/前端框架/react与vue.md"
          },
      ],
      "/算法": [
          {
              "text": "二叉树",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "100.相同的树",
                      "link": "/算法/二叉树/100.相同的树.md"
                  },
                  {
                      "text": "101.对称二叉树",
                      "link": "/算法/二叉树/101.对称二叉树.md"
                  },
                  {
                      "text": "104.二叉树的最大深度",
                      "link": "/算法/二叉树/104.二叉树的最大深度.md"
                  },
                  {
                      "text": "108.将有序数组转换为二叉搜索树",
                      "link": "/算法/二叉树/108.将有序数组转换为二叉搜索树.md"
                  },
                  {
                      "text": "110.平衡二叉树",
                      "link": "/算法/二叉树/110.平衡二叉树.md"
                  },
                  {
                      "text": "111.二叉树的最小深度",
                      "link": "/算法/二叉树/111.二叉树的最小深度.md"
                  },
                  {
                      "text": "112.路径总和",
                      "link": "/算法/二叉树/112.路径总和.md"
                  },
                  {
                      "text": "114.二叉树展开为链表",
                      "link": "/算法/二叉树/114.二叉树展开为链表.md"
                  },
                  {
                      "text": "116.填充每个节点的下一个右侧节点指针",
                      "link": "/算法/二叉树/116.填充每个节点的下一个右侧节点指针.md"
                  },
                  {
                      "text": "144.二叉树的前序遍历",
                      "link": "/算法/二叉树/144.二叉树的前序遍历.md"
                  },
                  {
                      "text": "145.二叉树的后序遍历",
                      "link": "/算法/二叉树/145.二叉树的后序遍历.md"
                  },
                  {
                      "text": "226.翻转二叉树",
                      "link": "/算法/二叉树/226.翻转二叉树.md"
                  },
                  {
                      "text": "450.删除二叉搜索树中的节点",
                      "link": "/算法/二叉树/450.删除二叉搜索树中的节点.md"
                  },
                  {
                      "text": "700.二叉搜索树中的搜索",
                      "link": "/算法/二叉树/700.二叉搜索树中的搜索.md"
                  },
                  {
                      "text": "701.二叉搜索树中的插入操作",
                      "link": "/算法/二叉树/701.二叉搜索树中的插入操作.md"
                  },
                  {
                      "text": "94.二叉树的中序遍历",
                      "link": "/算法/二叉树/94.二叉树的中序遍历.md"
                  },
                  {
                      "text": "98.验证二叉搜索树",
                      "link": "/算法/二叉树/98.验证二叉搜索树.md"
                  },
                  {
                      "text": "index",
                      "link": "/算法/二叉树/index.md"
                  }
              ]
          },
          {
              "text": "其他",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "1630.等差子数组",
                      "link": "/算法/其他/1630.等差子数组.md"
                  },
                  {
                      "text": "204.计数质数",
                      "link": "/算法/其他/204.计数质数.md"
                  },
                  {
                      "text": "238.除自身以外数组的乘积",
                      "link": "/算法/其他/238.除自身以外数组的乘积.md"
                  },
                  {
                      "text": "43.字符串相乘",
                      "link": "/算法/其他/43.字符串相乘.md"
                  }
              ]
          },
          {
              "text": "分治算法",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "241.为运算表达式设计优先级",
                      "link": "/算法/分治算法/241.为运算表达式设计优先级.md"
                  },
                  {
                      "text": "归并排序",
                      "link": "/算法/分治算法/归并排序.md"
                  }
              ]
          },
          {
              "text": "动态规划",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "120.三角形最小路径和",
                      "link": "/算法/动态规划/120.三角形最小路径和.md"
                  },
                  {
                      "text": "279.完全平方数",
                      "link": "/算法/动态规划/279.完全平方数.md"
                  },
                  {
                      "text": "322.零钱兑换",
                      "link": "/算法/动态规划/322.零钱兑换.md"
                  },
                  {
                      "text": "45.跳跃游戏-ii",
                      "link": "/算法/动态规划/45.跳跃游戏-ii.md"
                  },
                  {
                      "text": "509.斐波那契数",
                      "link": "/算法/动态规划/509.斐波那契数.md"
                  },
                  {
                      "text": "62.不同路径",
                      "link": "/算法/动态规划/62.不同路径.md"
                  },
                  {
                      "text": "63.不同路径-ii",
                      "link": "/算法/动态规划/63.不同路径-ii.md"
                  },
                  {
                      "text": "70.爬楼梯",
                      "link": "/算法/动态规划/70.爬楼梯.md"
                  },
                  {
                      "text": "index",
                      "link": "/算法/动态规划/index.md"
                  },
                  {
                      "text": "买卖股票系列问题",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "index",
                              "link": "/算法/动态规划/买卖股票系列问题/index.md"
                          }
                      ]
                  },
                  {
                      "text": "子序列类问题",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "1143.最长公共子序列",
                              "link": "/算法/动态规划/子序列类问题/1143.最长公共子序列.md"
                          },
                          {
                              "text": "300.最长递增子序列",
                              "link": "/算法/动态规划/子序列类问题/300.最长递增子序列.md"
                          },
                          {
                              "text": "354.俄罗斯套娃信封问题",
                              "link": "/算法/动态规划/子序列类问题/354.俄罗斯套娃信封问题.md"
                          },
                          {
                              "text": "516.最长回文子序列",
                              "link": "/算法/动态规划/子序列类问题/516.最长回文子序列.md"
                          },
                          {
                              "text": "53.最大子数组和",
                              "link": "/算法/动态规划/子序列类问题/53.最大子数组和.md"
                          },
                          {
                              "text": "647.回文子串",
                              "link": "/算法/动态规划/子序列类问题/647.回文子串.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/动态规划/子序列类问题/index.md"
                          }
                      ]
                  },
                  {
                      "text": "打家劫舍问题",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "198.打家劫舍",
                              "link": "/算法/动态规划/打家劫舍问题/198.打家劫舍.md"
                          },
                          {
                              "text": "213.打家劫舍-ii",
                              "link": "/算法/动态规划/打家劫舍问题/213.打家劫舍-ii.md"
                          },
                          {
                              "text": "337.打家劫舍-iii",
                              "link": "/算法/动态规划/打家劫舍问题/337.打家劫舍-iii.md"
                          }
                      ]
                  },
                  {
                      "text": "贪心算法",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "1024.视频拼接",
                              "link": "/算法/动态规划/贪心算法/1024.视频拼接.md"
                          },
                          {
                              "text": "435.无重叠区间",
                              "link": "/算法/动态规划/贪心算法/435.无重叠区间.md"
                          },
                          {
                              "text": "45.跳跃游戏-ii",
                              "link": "/算法/动态规划/贪心算法/45.跳跃游戏-ii.md"
                          },
                          {
                              "text": "452.用最少数量的箭引爆气球",
                              "link": "/算法/动态规划/贪心算法/452.用最少数量的箭引爆气球.md"
                          },
                          {
                              "text": "55.跳跃游戏",
                              "link": "/算法/动态规划/贪心算法/55.跳跃游戏.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/动态规划/贪心算法/index.md"
                          }
                      ]
                  },
                  {
                      "text": "路径类问题",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "120.三角形最小路径和",
                              "link": "/算法/动态规划/路径类问题/120.三角形最小路径和.md"
                          },
                          {
                              "text": "62.不同路径",
                              "link": "/算法/动态规划/路径类问题/62.不同路径.md"
                          },
                          {
                              "text": "63.不同路径-ii",
                              "link": "/算法/动态规划/路径类问题/63.不同路径-ii.md"
                          },
                          {
                              "text": "64.最小路径和",
                              "link": "/算法/动态规划/路径类问题/64.最小路径和.md"
                          },
                          {
                              "text": "70.爬楼梯",
                              "link": "/算法/动态规划/路径类问题/70.爬楼梯.md"
                          },
                          {
                              "text": "931.下降路径最小和",
                              "link": "/算法/动态规划/路径类问题/931.下降路径最小和.md"
                          }
                      ]
                  }
              ]
          },
          {
              "text": "回溯算法(DFS深度优先遍历)",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "22.括号生成",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/22.括号生成.md"
                  },
                  {
                      "text": "39.组合总和",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/39.组合总和.md"
                  },
                  {
                      "text": "46.全排列",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/46.全排列.md"
                  },
                  {
                      "text": "47.全排列-ii",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/47.全排列-ii.md"
                  },
                  {
                      "text": "77.组合",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/77.组合.md"
                  },
                  {
                      "text": "78.子集",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/78.子集.md"
                  },
                  {
                      "text": "90.子集-ii",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/90.子集-ii.md"
                  },
                  {
                      "text": "index",
                      "link": "/算法/回溯算法(DFS深度优先遍历)/index.md"
                  },
                  {
                      "text": "pic",
                      "collapsible": true,
                      "collapsed": false,
                      "items": []
                  }
              ]
          },
          {
              "text": "图论",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "797.所有可能的路径",
                      "link": "/算法/图论/797.所有可能的路径.md"
                  },
                  {
                      "text": "index",
                      "link": "/算法/图论/index.md"
                  }
              ]
          },
          {
              "text": "括号相关的问题",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "1541.平衡括号字符串的最少插入次数",
                      "link": "/算法/括号相关的问题/1541.平衡括号字符串的最少插入次数.md"
                  },
                  {
                      "text": "20.有效的括号",
                      "link": "/算法/括号相关的问题/20.有效的括号.md"
                  },
                  {
                      "text": "22.括号生成",
                      "link": "/算法/括号相关的问题/22.括号生成.md"
                  },
                  {
                      "text": "921.使括号有效的最少添加",
                      "link": "/算法/括号相关的问题/921.使括号有效的最少添加.md"
                  },
                  {
                      "text": "index",
                      "link": "/算法/括号相关的问题/index.md"
                  }
              ]
          },
          {
              "text": "排序、查找算法",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "pictures",
                      "collapsible": true,
                      "collapsed": false,
                      "items": []
                  },
                  {
                      "text": "test",
                      "link": "/算法/排序、查找算法/test.md"
                  },
                  {
                      "text": "排序算法",
                      "link": "/算法/排序、查找算法/排序算法.md"
                  },
                  {
                      "text": "查找算法",
                      "link": "/算法/排序、查找算法/查找算法.md"
                  }
              ]
          },
          {
              "text": "数组",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "index",
                      "link": "/算法/数组/index.md"
                  },
                  {
                      "text": "二分搜索",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "34.在排序数组中查找元素的第一个和最后一个位置",
                              "link": "/算法/数组/二分搜索/34.在排序数组中查找元素的第一个和最后一个位置.md"
                          },
                          {
                              "text": "35.搜索插入位置",
                              "link": "/算法/数组/二分搜索/35.搜索插入位置.md"
                          },
                          {
                              "text": "704.二分查找",
                              "link": "/算法/数组/二分搜索/704.二分查找.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/数组/二分搜索/index.md"
                          }
                      ]
                  },
                  {
                      "text": "二维数组花式遍历技巧",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "48.旋转图像",
                              "link": "/算法/数组/二维数组花式遍历技巧/48.旋转图像.md"
                          },
                          {
                              "text": "54.螺旋矩阵",
                              "link": "/算法/数组/二维数组花式遍历技巧/54.螺旋矩阵.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/数组/二维数组花式遍历技巧/index.md"
                          }
                      ]
                  },
                  {
                      "text": "前缀和",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "2389.和有限的最长子序列",
                              "link": "/算法/数组/前缀和/2389.和有限的最长子序列.md"
                          },
                          {
                              "text": "303.区域和检索-数组不可变",
                              "link": "/算法/数组/前缀和/303.区域和检索-数组不可变.md"
                          },
                          {
                              "text": "304.二维区域和检索-矩阵不可变",
                              "link": "/算法/数组/前缀和/304.二维区域和检索-矩阵不可变.md"
                          },
                          {
                              "text": "53.最大子数组和",
                              "link": "/算法/数组/前缀和/53.最大子数组和.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/数组/前缀和/index.md"
                          }
                      ]
                  },
                  {
                      "text": "去重",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "316.去除重复字母",
                              "link": "/算法/数组/去重/316.去除重复字母.md"
                          }
                      ]
                  },
                  {
                      "text": "双指针",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "11.盛最多水的容器",
                              "link": "/算法/数组/双指针/11.盛最多水的容器.md"
                          },
                          {
                              "text": "15.三数之和",
                              "link": "/算法/数组/双指针/15.三数之和.md"
                          },
                          {
                              "text": "16.最接近的三数之和",
                              "link": "/算法/数组/双指针/16.最接近的三数之和.md"
                          },
                          {
                              "text": "876.链表的中间结点",
                              "link": "/算法/数组/双指针/876.链表的中间结点.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/数组/双指针/index.md"
                          },
                          {
                              "text": "左右指针",
                              "collapsible": true,
                              "collapsed": false,
                              "items": [
                                  {
                                      "text": "1574.删除最短的子数组使剩余数组有序",
                                      "link": "/算法/数组/双指针/左右指针/1574.删除最短的子数组使剩余数组有序.md"
                                  },
                                  {
                                      "text": "167.两数之和-ii-输入有序数组",
                                      "link": "/算法/数组/双指针/左右指针/167.两数之和-ii-输入有序数组.md"
                                  },
                                  {
                                      "text": "344.反转字符串",
                                      "link": "/算法/数组/双指针/左右指针/344.反转字符串.md"
                                  },
                                  {
                                      "text": "5.最长回文子串",
                                      "link": "/算法/数组/双指针/左右指针/5.最长回文子串.md"
                                  },
                                  {
                                      "text": "647.回文子串",
                                      "link": "/算法/数组/双指针/左右指针/647.回文子串.md"
                                  },
                                  {
                                      "text": "index",
                                      "link": "/算法/数组/双指针/左右指针/index.md"
                                  }
                              ]
                          },
                          {
                              "text": "快慢指针",
                              "collapsible": true,
                              "collapsed": false,
                              "items": [
                                  {
                                      "text": "26.删除有序数组中的重复项",
                                      "link": "/算法/数组/双指针/快慢指针/26.删除有序数组中的重复项.md"
                                  },
                                  {
                                      "text": "27.移除元素",
                                      "link": "/算法/数组/双指针/快慢指针/27.移除元素.md"
                                  },
                                  {
                                      "text": "283.移动零",
                                      "link": "/算法/数组/双指针/快慢指针/283.移动零.md"
                                  },
                                  {
                                      "text": "index",
                                      "link": "/算法/数组/双指针/快慢指针/index.md"
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "text": "差分数组",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "1094.拼车",
                              "link": "/算法/数组/差分数组/1094.拼车.md"
                          },
                          {
                              "text": "1109.航班预订统计",
                              "link": "/算法/数组/差分数组/1109.航班预订统计.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/数组/差分数组/index.md"
                          }
                      ]
                  },
                  {
                      "text": "滑动窗口",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "1004.最大连续-1-的个数-iii",
                              "link": "/算法/数组/滑动窗口/1004.最大连续-1-的个数-iii.md"
                          },
                          {
                              "text": "1456.定长子串中元音的最大数目",
                              "link": "/算法/数组/滑动窗口/1456.定长子串中元音的最大数目.md"
                          },
                          {
                              "text": "219.存在重复元素-ii",
                              "link": "/算法/数组/滑动窗口/219.存在重复元素-ii.md"
                          },
                          {
                              "text": "3.无重复字符的最长子串",
                              "link": "/算法/数组/滑动窗口/3.无重复字符的最长子串.md"
                          },
                          {
                              "text": "438.找到字符串中所有字母异位词",
                              "link": "/算法/数组/滑动窗口/438.找到字符串中所有字母异位词.md"
                          },
                          {
                              "text": "53.最大子数组和",
                              "link": "/算法/数组/滑动窗口/53.最大子数组和.md"
                          },
                          {
                              "text": "567.字符串的排列",
                              "link": "/算法/数组/滑动窗口/567.字符串的排列.md"
                          },
                          {
                              "text": "76.最小覆盖子串",
                              "link": "/算法/数组/滑动窗口/76.最小覆盖子串.md"
                          },
                          {
                              "text": "904.水果成篮",
                              "link": "/算法/数组/滑动窗口/904.水果成篮.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/数组/滑动窗口/index.md"
                          }
                      ]
                  }
              ]
          },
          {
              "text": "最大堆",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "MaxHeap",
                      "link": "/算法/最大堆/MaxHeap.md"
                  },
                  {
                      "text": "最大堆",
                      "link": "/算法/最大堆/最大堆.md"
                  }
              ]
          },
          {
              "text": "设计数据结构",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "146.lru-缓存",
                      "link": "/算法/设计数据结构/146.lru-缓存.md"
                  },
                  {
                      "text": "239.滑动窗口最大值(单调队列)",
                      "link": "/算法/设计数据结构/239.滑动窗口最大值(单调队列).md"
                  },
                  {
                      "text": "380.o-1-时间插入、删除和获取随机元素",
                      "link": "/算法/设计数据结构/380.o-1-时间插入、删除和获取随机元素.md"
                  },
                  {
                      "text": "单调栈",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "index",
                              "link": "/算法/设计数据结构/单调栈/index.md"
                          }
                      ]
                  }
              ]
          },
          {
              "text": "链表",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "双指针技巧 - 单链表",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "141.环形链表",
                              "link": "/算法/链表/双指针技巧 - 单链表/141.环形链表.md"
                          },
                          {
                              "text": "160.相交链表",
                              "link": "/算法/链表/双指针技巧 - 单链表/160.相交链表.md"
                          },
                          {
                              "text": "21.合并两个有序链表",
                              "link": "/算法/链表/双指针技巧 - 单链表/21.合并两个有序链表.md"
                          },
                          {
                              "text": "83.删除排序链表中的重复元素",
                              "link": "/算法/链表/双指针技巧 - 单链表/83.删除排序链表中的重复元素.md"
                          },
                          {
                              "text": "86.分隔链表",
                              "link": "/算法/链表/双指针技巧 - 单链表/86.分隔链表.md"
                          },
                          {
                              "text": "876.链表的中间结点",
                              "link": "/算法/链表/双指针技巧 - 单链表/876.链表的中间结点.md"
                          },
                          {
                              "text": "index",
                              "link": "/算法/链表/双指针技巧 - 单链表/index.md"
                          }
                      ]
                  },
                  {
                      "text": "递归反转单链表",
                      "collapsible": true,
                      "collapsed": true,
                      "items": [
                          {
                              "text": "206.反转链表",
                              "link": "/算法/链表/递归反转单链表/206.反转链表.md"
                          },
                          {
                              "text": "25.k-个一组翻转链表",
                              "link": "/算法/链表/递归反转单链表/25.k-个一组翻转链表.md"
                          },
                          {
                              "text": "92.反转链表-ii",
                              "link": "/算法/链表/递归反转单链表/92.反转链表-ii.md"
                          }
                      ]
                  }
              ]
          },
          {
              "text": "随机算法",
              "collapsible": true,
              "collapsed": true,
              "items": [
                  {
                      "text": "384.打乱数组",
                      "link": "/算法/随机算法/384.打乱数组.md"
                  },
                  {
                      "text": "398.随机数索引",
                      "link": "/算法/随机算法/398.随机数索引.md"
                  },
                  {
                      "text": "528.按权重随机选择",
                      "link": "/算法/随机算法/528.按权重随机选择.md"
                  }
              ]
          }
      ],
      "/工程化": [
        {
          "text": "Webpack-学习笔记",
          "link": "/工程化/Webpack-学习笔记.md"
        },
        {
          "text": "包管理相关npm，yarn，pnpm",
          "link": "/工程化/包管理相关npm，yarn，pnpm.md"
        },
        {
          "text": "性能优化、监控相关",
          "link": "/工程化/性能优化、监控相关.md"
        }
      ],
      "/其他": [
          {
              "text": "前端渲染方案：CSR、SSR、SSG",
              "link": "/其他/前端渲染方案：CSR、SSR、SSG.md"
          },
          {
              "text": "单页面应用路由-hash、history模式",
              "link": "/其他/单页面应用路由-hash、history模式.md"
          },
          {
              "text": "浏览器跨域、网络安全、攻击防范",
              "link": "/其他/浏览器跨域、网络安全、攻击防范.md"
          },
          {
              "text": "登陆校验方案：cookie，JWT",
              "link": "/其他/登陆校验方案：cookie，JWT.md"
          },
          {
              "text": "网络请求axios、fetch",
              "link": "/其他/网络请求axios、fetch.md"
          }
      ],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/wanwenyun/",
      },
    ],
    footer: {
      message: "弯弯个人小站",
      copyright: `Copyright © 2023-${new Date().getFullYear()} wanwan `,
    },
    outlineTitle: "当前页",
    base: "/web-/",
  },
};
