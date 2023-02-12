/*
 * @Author: ouyangzhichao@kuaishou.com
 * @Date: 2023-02-11 15:40:25
 * @LastEditors: ouyangzhichao ouyangzhichao@kuaishou.com
 * @LastEditTime: 2023-02-12 16:17:44
 * @FilePath: /website/docs/.vitepress/config.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export default {
  title: "弯弯个人小站",
  description: "万雯赟小站",
  themeConfig: {
    logo: "/images/logo.png",
    nav: [
      { text: "个人履历", link: "/guide" },
      {
        text: "学习引导",
        items: [
          {
            text: "算法小册",
            link: "/算法/112.路径总和.md",
          },
          { text: "JS基础", link: "/js/call、apply、bind、new.md" },
          { text: "前端框架", link: "/前端框架/React/React-学习笔记.md" },
        ],
      },
      { text: "团队成员", link: "/team" },
    ],
    sidebar: {
      "/算法": [
        {
          text: "112.路径总和",
          link: "/算法/112.路径总和.md",
        },
        {
          text: "215.数组中的第k个最大元素",
          link: "/算法/215.数组中的第k个最大元素.md",
        },
        {
          text: "leetcode",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "1094.拼车",
              link: "/算法/leetcode/1094.拼车.md",
            },
          ],
        },
        {
          text: "leetcode题目整理",
          link: "/算法/leetcode题目整理.md",
        },
        {
          text: "二叉树",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "100.相同的树",
              link: "/算法/二叉树/100.相同的树.md",
            },
            {
              text: "101.对称二叉树",
              link: "/算法/二叉树/101.对称二叉树.md",
            },
            {
              text: "104.二叉树的最大深度",
              link: "/算法/二叉树/104.二叉树的最大深度.md",
            },
            {
              text: "108.将有序数组转换为二叉搜索树",
              link: "/算法/二叉树/108.将有序数组转换为二叉搜索树.md",
            },
            {
              text: "110.平衡二叉树",
              link: "/算法/二叉树/110.平衡二叉树.md",
            },
            {
              text: "111.二叉树的最小深度",
              link: "/算法/二叉树/111.二叉树的最小深度.md",
            },
            {
              text: "144.二叉树的前序遍历",
              link: "/算法/二叉树/144.二叉树的前序遍历.md",
            },
            {
              text: "145.二叉树的后序遍历",
              link: "/算法/二叉树/145.二叉树的后序遍历.md",
            },
            {
              text: "226.翻转二叉树",
              link: "/算法/二叉树/226.翻转二叉树.md",
            },
            {
              text: "94.二叉树的中序遍历",
              link: "/算法/二叉树/94.二叉树的中序遍历.md",
            },
          ],
        },
        {
          text: "动态规划",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "120.三角形最小路径和",
              link: "/算法/动态规划/120.三角形最小路径和.md",
            },
            {
              text: "279.完全平方数",
              link: "/算法/动态规划/279.完全平方数.md",
            },
            {
              text: "509.斐波那契数",
              link: "/算法/动态规划/509.斐波那契数.md",
            },
            {
              text: "62.不同路径",
              link: "/算法/动态规划/62.不同路径.md",
            },
            {
              text: "63.不同路径-ii",
              link: "/算法/动态规划/63.不同路径-ii.md",
            },
            {
              text: "70.爬楼梯",
              link: "/算法/动态规划/70.爬楼梯.md",
            },
            {
              text: "index",
              link: "/算法/动态规划/index.md",
            },
            {
              text: "买卖股票系列问题",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "index",
                  link: "/算法/动态规划/买卖股票系列问题/index.md",
                },
              ],
            },
          ],
        },
        {
          text: "数组",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "index",
              link: "/算法/数组/index.md",
            },
            {
              text: "二分搜索",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "34.在排序数组中查找元素的第一个和最后一个位置",
                  link: "/算法/数组/二分搜索/34.在排序数组中查找元素的第一个和最后一个位置.md",
                },
                {
                  text: "35.搜索插入位置",
                  link: "/算法/数组/二分搜索/35.搜索插入位置.md",
                },
                {
                  text: "704.二分查找",
                  link: "/算法/数组/二分搜索/704.二分查找.md",
                },
                {
                  text: "index",
                  link: "/算法/数组/二分搜索/index.md",
                },
              ],
            },
            {
              text: "二维数组花式遍历技巧",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "48.旋转图像",
                  link: "/算法/数组/二维数组花式遍历技巧/48.旋转图像.md",
                },
                {
                  text: "54.螺旋矩阵",
                  link: "/算法/数组/二维数组花式遍历技巧/54.螺旋矩阵.md",
                },
                {
                  text: "index",
                  link: "/算法/数组/二维数组花式遍历技巧/index.md",
                },
              ],
            },
            {
              text: "前缀和",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "303.区域和检索-数组不可变",
                  link: "/算法/数组/前缀和/303.区域和检索-数组不可变.md",
                },
                {
                  text: "304.二维区域和检索-矩阵不可变",
                  link: "/算法/数组/前缀和/304.二维区域和检索-矩阵不可变.md",
                },
                {
                  text: "index",
                  link: "/算法/数组/前缀和/index.md",
                },
              ],
            },
            {
              text: "双指针",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "11.盛最多水的容器",
                  link: "/算法/数组/双指针/11.盛最多水的容器.md",
                },
                {
                  text: "15.三数之和",
                  link: "/算法/数组/双指针/15.三数之和.md",
                },
                {
                  text: "16.最接近的三数之和",
                  link: "/算法/数组/双指针/16.最接近的三数之和.md",
                },
                {
                  text: "876.链表的中间结点",
                  link: "/算法/数组/双指针/876.链表的中间结点.md",
                },
                {
                  text: "index",
                  link: "/算法/数组/双指针/index.md",
                },
                {
                  text: "左右指针",
                  collapsible: true,
                  collapsed: false,
                  items: [
                    {
                      text: "167.两数之和-ii-输入有序数组",
                      link: "/算法/数组/双指针/左右指针/167.两数之和-ii-输入有序数组.md",
                    },
                    {
                      text: "344.反转字符串",
                      link: "/算法/数组/双指针/左右指针/344.反转字符串.md",
                    },
                    {
                      text: "5.最长回文子串",
                      link: "/算法/数组/双指针/左右指针/5.最长回文子串.md",
                    },
                    {
                      text: "index",
                      link: "/算法/数组/双指针/左右指针/index.md",
                    },
                  ],
                },
                {
                  text: "快慢指针",
                  collapsible: true,
                  collapsed: false,
                  items: [
                    {
                      text: "26.删除有序数组中的重复项",
                      link: "/算法/数组/双指针/快慢指针/26.删除有序数组中的重复项.md",
                    },
                    {
                      text: "27.移除元素",
                      link: "/算法/数组/双指针/快慢指针/27.移除元素.md",
                    },
                    {
                      text: "283.移动零",
                      link: "/算法/数组/双指针/快慢指针/283.移动零.md",
                    },
                    {
                      text: "index",
                      link: "/算法/数组/双指针/快慢指针/index.md",
                    },
                  ],
                },
              ],
            },
            {
              text: "差分数组",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "1109.航班预订统计",
                  link: "/算法/数组/差分数组/1109.航班预订统计.md",
                },
                {
                  text: "index",
                  link: "/算法/数组/差分数组/index.md",
                },
              ],
            },
            {
              text: "滑动窗口",
              collapsible: true,
              collapsed: false,
              items: [
                {
                  text: "1456.定长子串中元音的最大数目",
                  link: "/算法/数组/滑动窗口/1456.定长子串中元音的最大数目.md",
                },
                {
                  text: "219.存在重复元素-ii",
                  link: "/算法/数组/滑动窗口/219.存在重复元素-ii.md",
                },
                {
                  text: "3.无重复字符的最长子串",
                  link: "/算法/数组/滑动窗口/3.无重复字符的最长子串.md",
                },
                {
                  text: "438.找到字符串中所有字母异位词",
                  link: "/算法/数组/滑动窗口/438.找到字符串中所有字母异位词.md",
                },
                {
                  text: "567.字符串的排列",
                  link: "/算法/数组/滑动窗口/567.字符串的排列.md",
                },
                {
                  text: "76.最小覆盖子串",
                  link: "/算法/数组/滑动窗口/76.最小覆盖子串.md",
                },
                {
                  text: "904.水果成篮",
                  link: "/算法/数组/滑动窗口/904.水果成篮.md",
                },
                {
                  text: "index",
                  link: "/算法/数组/滑动窗口/index.md",
                },
              ],
            },
          ],
        },
        {
          text: "最大堆",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "MaxHeap",
              link: "/算法/最大堆/MaxHeap.md",
            },
            {
              text: "最大堆",
              link: "/算法/最大堆/最大堆.md",
            },
          ],
        },
        {
          text: "链表",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "141.环形链表",
              link: "/算法/链表/141.环形链表.md",
            },
            {
              text: "160.相交链表",
              link: "/算法/链表/160.相交链表.md",
            },
            {
              text: "21.合并两个有序链表",
              link: "/算法/链表/21.合并两个有序链表.md",
            },
            {
              text: "83.删除排序链表中的重复元素",
              link: "/算法/链表/83.删除排序链表中的重复元素.md",
            },
            {
              text: "86.分隔链表",
              link: "/算法/链表/86.分隔链表.md",
            },
            {
              text: "876.链表的中间结点",
              link: "/算法/链表/876.链表的中间结点.md",
            },
            {
              text: "index",
              link: "/算法/链表/index.md",
            },
          ],
        },
      ],
      "/js": [
        {
          text: "call、apply、bind、new",
          link: "/js/call、apply、bind、new.md",
        },
        {
          text: "js事件循环机制-EventLoop",
          link: "/js/js事件循环机制-EventLoop.md",
        },
        {
          text: "js原型、作用域、this、执行上下文、闭包",
          link: "/js/js原型、作用域、this、执行上下文、闭包.md",
        },
        {
          text: "js奇技淫巧",
          link: "/js/js奇技淫巧.md",
        },
      ],
      "/前端框架": [
        {
          text: "React",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "React-学习笔记",
              link: "/前端框架/React/React-学习笔记.md",
            },
            {
              text: "React好文list",
              link: "/前端框架/React/React好文list.md",
            },
            {
              text: "React学习小笔记（超哥）",
              link: "/前端框架/React/React学习小笔记（超哥）.md",
            },
          ],
        },
        {
          text: "Vue",
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: "vue响应式原理",
              link: "/前端框架/Vue/vue响应式原理.md",
            },
          ],
        },
        {
          text: "react与vue",
          link: "/前端框架/react与vue.md",
        },
        {
          text: "前端框架原理",
          link: "/前端框架/前端框架原理.md",
        },
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
