<template>
  <div>
    <el-card>
      <div style="margin-left: 60px">
        <el-button type="primary" @click="handleCheckedKeys">
          {{buttonName}}
        </el-button>
        <el-tree ref="tree" :data="data" show-checkbox :check-strictly="true" node-key="id" :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" :props="defaultProps" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MultiTree',
  // 当props是Array或者Object类型的，默认值定义需要用函数返回(工厂方法)。可以使用lambda表达式。
  props: {
    buttonName: { type: String, default: '获取' },
    data: { type: Array, default: () => [] },
    labelPropName: { type: String, default: '' },
    // 它代表的是data数据中哪一个字段用于在树形菜单项中，作为显示内容。
    // 比如：“系统管理”，“用户信息接口”。在菜单的treedata中，该字段应该是menuName；在接口的treedata中，该字段应该是apiName。
    defaultExpandedKeys: { type: Array, default: () => [] },
    defaultCheckedKeys: { type: Array, default: () => [] }
  },
  data() {
    return {
      // defaultProps是组件内部使用的，绑定el-tree的props属性。
      // 告诉el-tree，children属性里面保存的是子节点数据，this.labelPropName作为label显示在菜单项中。
      defaultProps: {
        children: 'children',
        label: this.labelPropName
      }
    }
  },
  methods: {
    handleCheckedKeys() {
      this.$emit('handleCheckedKeys', this.$refs.tree.getCheckedKeys())
    }
  }
}
</script>