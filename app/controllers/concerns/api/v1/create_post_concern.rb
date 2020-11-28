module Api
  module V1
    module CreatePostConcern
      extend ActiveSupport::Concern

      def create_post(auth, post_params)
        render json: auth, status: :unauthorized and return unless auth[:data]

        uid = auth[:data][:uid]
        user = User.find_by(uid: uid)
        render json: { message: 'ユーザが存在しません' }, status: :bad_request and return if user.blank?        

        post_params[:user] = user
        post = Post.new(post_params)
        if post.save
          render json: { data: post }
        else
          render json: post.errors.messages, status: :unprocessable_entity
        end
      end
    end
  end
end
