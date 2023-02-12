---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/wanwenyun.png',
    name: 'Wenyun Wan',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/wanwenyun/' },
    ]
  },
    {
    avatar: 'https://www.github.com/ZhichaoOuyang.png',
    name: 'Zhichao Ouyang',
    title: 'Support',
    links: [
      { icon: 'github', link: 'https://github.com/ZhichaoOuyang' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      团队成员
    </template>
    <template #lead>
      感谢以下两位同学对本网站的开发支持
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
