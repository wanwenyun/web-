import{_ as s,o as n,c as a,V as l}from"./chunks/framework.75331a37.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"算法/二叉树/226.翻转二叉树.md","filePath":"算法/二叉树/226.翻转二叉树.md"}'),t={name:"算法/二叉树/226.翻转二叉树.md"},o=l(`<div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * @lc app=leetcode.cn id=226 lang=javascript</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * [226] 翻转二叉树</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// @lc code=start</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * Definition for a binary tree node.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * function TreeNode(val, left, right) {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *     this.val = (val===undefined ? 0 : val)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *     this.left = (left===undefined ? null : left)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> *     this.right = (right===undefined ? null : right)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">TreeNode</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">root</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">return</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">TreeNode</span><span style="color:#89DDFF;font-style:italic;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 遍历的思想</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// var invertTree = function(root) {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     traverse(root);</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     return root;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// var traverse = function(root) {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     if(!root) return;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     /** 前序位置：交换左右子节点 **/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     let tmp = root.left;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     root.left = root.right;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     root.right = tmp;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     traverse(root.left);</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//     traverse(root.right);</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 分解思想: 将以 root 为根的这棵二叉树翻转，返回翻转后的二叉树的根节点</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> invertTree </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">root</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 注意，这里不能直接return, 需return null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 利用函数定义，先翻转左右子树</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">invertTree</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">right</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">invertTree</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">right</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 然后交换左右子节点</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">right</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">right</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">left</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 和定义逻辑自恰：以 root 为根的这棵二叉树已经被翻转，返回 root</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// @lc code=end</span></span></code></pre></div>`,1),p=[o];function e(c,r,i,y,F,f){return n(),a("div",null,p)}const C=s(t,[["render",e]]);export{A as __pageData,C as default};
