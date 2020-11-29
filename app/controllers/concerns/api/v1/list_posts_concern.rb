module Api
  module V1
    module ListPostsConcern
      extend ActiveSupport::Concern

      def list_posts
        posts = Post.order(created_at: 'DESC')
        render json: { data: posts }
      end
    end
  end
end
