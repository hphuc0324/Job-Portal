import { CircleCheck, TriangleAlert, CircleX } from 'lucide-react';

interface NotificationProps {
  image?: string;
  content: string;
  type?: 'success' | 'warning' | 'error';
  time: Date;
}

function Notification({ type = 'success', content, image, time }: NotificationProps) {
  return (
    <div className="flex items-center gap-2 p-1 my-2">
      {image && <img className="w-8 h-8 rounded-full" src={image} alt="Notification image" />}
      {!image && type === 'success' && (
        <div>
          <CircleCheck className="w-8 h-8 text-green-500" />
        </div>
      )}
      {!image && type === 'warning' && (
        <div>
          <TriangleAlert className="w-8 h-8 text-yellow-500" />
        </div>
      )}
      {!image && type === 'error' && (
        <div>
          <CircleX className="w-8 h-8 text-red-500" />
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-sm max-h-10 max-w-full line-clamp-2">{content}</span>

        <span className="text-xs">{time.toDateString()}</span>
      </div>
    </div>
  );
}

export default Notification;
