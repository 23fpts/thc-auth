<template>
  <div>
    <el-card body-style="padding: 0">
      <el-form ref="roleQueryForm" :model="roleQueryForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色" prop="roleLike">
              <el-input v-model="roleQueryForm.roleLike" placeholder="请输入角色名称或角色编码或角色描述" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button type="primary" size="small" @click="submitQueryForm()" icon="el-icon-search">
                查询</el-button>
              <el-button type="primary" size="small" plain @click="resetQueryForm('roleQueryForm')" icon="el-icon-refresh">
                重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary" size="small" style="margin: 0 0 10px 20px" icon="el-icon-plus" @click="handleAdd()">新增</el-button>

      <el-table :data="tableData" border default-expand-all stripe style="width: 100%;margin-bottom: 20px;">
        <el-table-column prop="roleName" label="角色名称" width="200" />
        <el-table-column prop="roleCode" label="角色编码" width="200" align="center" />
        <el-table-column prop="sort" label="排序" width="200" align="center" />
        <el-table-column prop="status" label="是否禁用" width="200" align="center" :formatter="statusFormat" />
        <el-table-column prop="roleDesc" label="角色描述" width="" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)" />
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)" />
            <el-button size="mini" type="success" @click="assignPerm(scope.$index, scope.row)">
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="beforeDialogClose">
      <el-form :model="dialogForm" ref="dialogForm" :rules="dialogFormRules" label-width="80px">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="dialogForm.roleName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色编码" prop="roleCode">
              <el-input v-model="dialogForm.roleCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色描述" prop="roleDesc">
              <el-input v-model="dialogForm.roleDesc" label="角色描述"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序序号" prop="sort">
              <el-input-number v-model="dialogForm.sort" :min="1" label="排序序号"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitDialogForm" size="mini" type="primary">确 定</el-button>
        <el-button @click="handleCloseDialog" size="mini">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 权限管理 -->
    <el-dialog :title="permDialogTitle" :visible.sync="permDialogVisible">
      <el-row>
        <el-col :span="12">
          <multi-tree :data="menuData" :labelPropName="menuLabelPropName" :buttonName="menuButtonName" :defaultExpandedKeys="menuDefaultExpandedKeys" :defaultCheckedKeys="menuDefaultCheckedKeys" @handleCheckedKeys="handleMenuCheckedKeys"></multi-tree>
        </el-col>
        <el-col :span="12">
          <multi-tree :data="apiData" :labelPropName="apiLabelPropName" :buttonName="apiButtonName" :defaultExpandedKeys="apiDefaultExpandedKeys" :defaultCheckedKeys="apiDefaultCheckedKeys" @handleCheckedKeys="handleApiCheckedKeys"></multi-tree>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { getRoles, updateRole, addRole, deleteRole } from '@/api/system'
import {
  getMenuCheckedTree,
  saveMenuCheckedKeys,
  getApiCheckedTree,
  saveApiCheckedKeys
} from '@/api/system'
import axios from 'axios'
import MultiTree from '../../components/MultiTree'
export default {
  name: 'SystemRole',
  components: { MultiTree },
  data() {
    return {
      tableData: [], // //table表格数据
      roleQueryForm: {
        roleLike: ''
      },
      // 模糊查询条件
      dialogFormVisible: false, //弹出框表单,true弹出，false隐藏
      dialogTitle: '', //弹出框表单form头，如："新增角色"
      dialogForm: {
        //弹出框表单数据
        id: null,
        roleName: '', //角色名称
        roleCode: '', //角色编码
        roleDesc: '', //角色描述
        sort: '' //排序序号
      },
      dialogFormRules: {
        //弹出框表单校验规则
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ]
      },
      handlingRoleId: null, //当前正在分配权限的角色id，点击行末“分配权限”按钮的时候赋值
      permDialogVisible: false, //分配权限的弹出框默认不可见
      permDialogTitle: '', //弹出框标题，点击行末“分配权限”按钮的时候赋值
      menuData: [], //菜单树数据
      menuLabelPropName: 'menuName', //菜单树数据中的label显示内容字段名称
      menuButtonName: '保存菜单查看权限', //保存权限按钮的名字
      menuDefaultExpandedKeys: [], //默认展开节点
      menuDefaultCheckedKeys: [], //默认勾选节点
      apiData: [],
      apiLabelPropName: 'apiName',
      apiButtonName: '保存接口访问权限',
      apiDefaultExpandedKeys: [],
      apiDefaultCheckedKeys: []
    }
  },

  created() {
    console.log(this.roleQueryForm)
    console.log(this.dialogForm)
  },

  methods: {
    submitQueryForm() {
      // 点击“查询按钮”触发查询操作
      getRoles(this.roleQueryForm.roleLike) // axios获取表单数据接口
        .then(res => {
          this.setData(res)
        })
    },
    resetQueryForm(formName) {
      // 查询表单查询条件重置
      this.$refs[formName].resetFields() // 查询条件重置
      this.submitQueryForm(formName) // 表格数据重新查询
    },
    // 表格数据status“是否禁用”翻译为中文，
    // 结合表格status字段属性:formatter = "statusFormat"使用
    statusFormat(row, column) {
      if (row.status) {
        return '已禁用'
      } else {
        return '未禁用'
      }
    },
    handleAdd() {
      // 点击新增按钮
      this.dialogFormVisible = true // 弹出框表单显示
      this.dialogTitle = '新增角色' // 弹出框Title
      this.resetDialogForm() // 重置弹出框表单
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true // 弹出框表单显示
      this.dialogTitle = '修改角色' // 弹出框Title
      this.resetDialogForm() // 重置弹出框表单
      this.dialogForm = { ...row } // 从被点击行获取数据，为弹出框表单数据初始化, ...意思应该就是把row的内容拷贝到dalogForm对象中
    },
    resetDialogForm() {
      // 重置弹出框表单数据
      this.dialogForm.id = null
      this.dialogForm.roleName = ''
      this.dialogForm.roleCode = ''
      this.dialogForm.roleDesc = ''
      this.dialogForm.sort = ''
    },
    submitDialogForm() {
      // 点击“提交”按钮，提交弹出框表单数据
      this.$refs.dialogForm.validate(valid => {
        // 数据校验
        if (valid) {
          // 如果校验通过
          this.$confirm('确定提交数据么?') // 提示用户确认“提交”
            .then(_ => {
              if (this.dialogForm.id) {
                // 有id是更新数据，没有id是新增数据
                updateRole(this.dialogForm).then(res => {
                  this.$message({ message: res.data, type: 'success' })
                  this.submitQueryForm() // 修改之后，重新查询table
                  this.handleCloseDialog()
                })
              } else {
                addRole(this.dialogForm).then(res => {
                  this.$message({ message: res.data, type: 'success' })
                  this.submitQueryForm() // 新增之后，重新查询table
                  this.handleCloseDialog()
                })
              }
              // 取消新增或修改也要重置表单
            })
            .catch(_ => {
              this.handleCloseDialog()
            })
        } else {
          return false
        }
      })
    },
    handleCloseDialog() {
      // resetFields就是一个坑，有两个作用
      // 1.重置的值不是空的，而是第一次被赋予的值。
      // 第一次dialogForm赋空值，后续才能重置为空值。
      // 这就是我们在新增修改打开弹出框操作的时候，调用resetDialogFrom清空数据的原因。
      // 2.清空校验结果
      this.$refs['dialogForm'].resetFields() // 重置弹出框表单数据
      this.dialogFormVisible = false
    },
    beforeDialogClose(done) {
      // 点击弹出框右上角“X”触发
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs['dialogForm'].resetFields() // 重置弹出框表单数据
          done()
        })
        .catch(_ => {})
    },
    handleDelete(index, row) {
      //点击“删除”按钮触发该函数
      this.$confirm('确定删除[' + row.apiName + ']?').then(_ => {
        deleteRole(row.id)
          .then(res => {
            this.submitQueryForm() //删除之后，重新查询table
            this.$message({ message: res.data, type: 'success' })
          })
          .catch(err => {
            this.$message({ message: err.message, type: 'success' })
          })
      })
    },
    setData(roles) {
      //初始化表格数据
      if (roles.success) {
        this.tableData = roles.data
      }
    },
    //点击行末“分配权限”按钮的时候触发，在《角色管理CURD》章节
    assignPerm(index, row) {
      console.log(index)
      console.log(row)
      this.handlingRoleId = row.id //当前正在分配权限的角色id
      let _this = this
      // axios.all的作用是多个请求多完成之后才进入then方法。res1是getMenuCheckedTree请求结果，res2是getApiCheckedTree的请求结果。
      // 最后将请求结果赋值给页面绑定数据
      axios.all([getMenuCheckedTree(row.id), getApiCheckedTree(row.id)]).then(
        axios.spread(function(res1, res2) {
          console.log(res1)
          console.log(res2)
          // 两个请求都执行完成后，进入该函数
          _this.menuData = res1.data.tree
          _this.menuDefaultExpandedKeys = res1.data.expandedKeys
          _this.menuDefaultCheckedKeys = res1.data.checkedKeys
          _this.apiData = res2.data.tree
          _this.apiDefaultExpandedKeys = res2.data.expandedKeys
          _this.apiDefaultCheckedKeys = res2.data.checkedKeys
          _this.permDialogVisible = true
          _this.permDialogTitle = row.roleName + '角色:权限分配'
        })
      )
    },
    handleMenuCheckedKeys(checkedKeys) {
      saveMenuCheckedKeys(this.handlingRoleId, checkedKeys).then(res => {
        this.$message({ message: res.data, type: 'success' })
      })
    },
    handleApiCheckedKeys(checkedKeys) {
      saveApiCheckedKeys(this.handlingRoleId, checkedKeys).then(res => {
        this.$message({ message: res.data, type: 'success' })
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    //在进入页面之前初始化数据
    getRoles('').then(res => {
      console.log(res)
      //调用axios角色信息查询接口
      next(vm => vm.setData(res))
    })
  }
}
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
</style>
