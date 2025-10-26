<?php


namespace App\Events;

use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;

class SendMessageEvent implements ShouldBroadcastNow
{
    use SerializesModels;

    public $message;
    public $from;

    public function __construct($message, $from)
    {
        
        $this->message = $message;
        $this->from = $from;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }

    public function broadcastAs(): string
    {
        return 'SendMessageEvent';
    }
}
