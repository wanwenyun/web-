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
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      团队成员
    </template>
    <template #lead>
      多谢关注，多多指教
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
