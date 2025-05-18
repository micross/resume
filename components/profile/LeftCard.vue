<template>
  <div class="left-person-card">
    <!-- 头像 -->
    <div class="avatar-box">
      <el-upload class="person-avatar-uploader" :action="uploadAddress()" :headers="{ Authorization: token }"
        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="userInfoStore.user?.avatar" :src="userInfoStore.user.avatar"
          class="avatar" />
        <el-avatar v-else :size="70">
          {{ userInfoStore.user.nickname }}
        </el-avatar>

        <!-- 相机图标 -->
        <div class="camera-box">
          <svg-icon icon-name="icon-xiangji1" class="iconfont" color="#fff" size="20px"></svg-icon>
        </div>
      </el-upload>
    </div>
    <!-- 菜单 -->
    <PersonMenuVue></PersonMenuVue>
  </div>
</template>
<script lang="ts" setup>
import { updateUserAvatarAsync } from '~/composables/api/user';
import { ElMessage, type UploadProps } from 'element-plus';
import PersonMenuVue from './PersonMenu.vue';
import { useUserInfoStore } from '~/store/user';

const token = useCookie('token');
const userInfoStore = useUserInfoStore();
const config = useRuntimeConfig();

// 上传文件地址
const uploadAddress = () => {
  return config.public.apiBase + '/storage/image';
};

const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
  userInfoStore.user.avatar = response.url;
  let params = {
    avatar: response.url
  };
  const data = await updateUserAvatarAsync(params);
  if (data.data.status === 200) {
    ElMessage.success('更新成功');
  } else {
    ElMessage.error(data.data.message);
  }
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('头像大小不能大于5M');
    return false;
  }
  return true;
};
</script>


<style lang="scss" scoped>
.left-person-card {
  width: 300px;
  min-height: 400px;
  border-radius: 5px;
  box-shadow: 0 5px 21px 0 rgb(78 78 78 / 25%);
  background-color: rgba(#fff, 0.5);
  z-index: 2;
  margin-top: 90px;

  .avatar-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140px;

    .person-avatar-uploader {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      // overflow: hidden;
      position: relative;

      .camera-box {
        position: absolute;
        right: 6px;
        bottom: -7px;
      }

      :deep(.el-upload) {
        width: 70px;
        height: 70px;
        border: 1px solid #ccc !important;
        border-radius: 50%;

        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
