module Api
  module V1
    module ListPostsConcern
      extend ActiveSupport::Concern

      def list_posts
        posts = Post.all
        render json: { data: posts }
      end
    end
  end
end
