<template>
	<div class="login_container">
		<div class="login_box">
			<div class="avatar_box"><img src="../assets/heima.jpg" alt="" /></div>
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" placeholder="请输入内容"><i slot="prefix" class="el-icon-user-solid el-input__icon"></i></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input placeholder="请输入密码" v-model="loginForm.password" show-password><i slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="login">提交</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			//登录表单的数据绑定对象
			loginForm: {
				username: 'admin',
				password: '123456'
			},
			//表单验证规则
			loginFormRules: {
				//验证用户名是否合格
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
				//验证密码是否合格
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }]
			}
		};
	},
	methods: {
		//点击重置按钮 ， 重置表单
		resetLoginForm() {
			this.$refs.loginFormRef.resetFields();
		},
		login() {
			this.$refs.loginFormRef.validate(async valid => {
				if (!valid) return;
				const { data: res } = await this.$http.post('login', this.loginForm);
				if (res.meta.status !== 200) return this.$message.error('登录失败！');
				this.$message.success('登录成功');

				window.sessionStorage.setItem('token', res.data.token);
				this.$router.push('/home');
			});
		}
	}
};
</script>

<style lang="less" scoped>
.login_container {
	background-color: #2b4b6b;
	height: 100%;
}

.login_box {
	width: 450px;
	height: 300px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.avatar_box {
	height: 130px;
	width: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;

	img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
		background-color: #eee;
	}
}

.login_form {
	position: absolute;
	width: 100%;
	bottom: 0;
	padding: 0 15px;
	box-sizing: border-box;
}

.login_form .el-input {
	margin-bottom: 20px;
}

.btns {
	display: flex;
	justify-content: flex-end;
}
</style>
